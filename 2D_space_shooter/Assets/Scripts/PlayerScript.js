#pragma strict


var rb : Rigidbody2D;
var PlayerLife : float;
var PlayerShip : Transform;
var healthBar : Transform;
var clone : Transform;
var myScore : int = 0;
var scoreText : GUIText;

function Awake(){
	DontDestroyOnLoad (this.gameObject);
}

// --------

function Start () {
		clone = Instantiate(PlayerShip, rb.position, Quaternion.identity);
		clone.name = "Player ship";
}

// --------

function setHealthBar(){
	yield WaitForSeconds(0.7);
	scoreText = GameObject.Find("scoreText").GetComponent.<GUIText>();
	this.score(0);
	healthBar = Instantiate(healthBar);
	clone.SendMessage("setHealthBar",healthBar);
}

// --------

function score(nr : int){
	myScore += nr;
	scoreText.text = "Score: " + myScore;
}

// -----

function loadHighScore(){
	if (PlayerPrefs.HasKey("highScore")) {
		return PlayerPrefs.GetInt("highScore");
	}

	return 0;
}

// -----

function saveScore(name, score : int){
	var currHighScore = this.loadHighScore();

	if (score > currHighScore) {
		PlayerPrefs.SetInt("highScore",score);
		PlayerPrefs.SetString("highScoreName",name);
	}

	PlayerPrefs.Save();
}

// --------

function Death(){
	PlayerLife-=1;
	if (PlayerLife<=0){
		this.saveScore("Gustaf",myScore);
		Destroy(this.gameObject);
		Application.LoadLevel ("Startmenu");
	}else{
		Application.LoadLevel (Application.loadedLevel);
		Destroy(clone.gameObject);
		clone = Instantiate(PlayerShip, rb.position, Quaternion.identity);
		clone.name = "Player ship";
		clone.SendMessage("Start");
		this.SendMessage("setHealthBar");
		}
}

// -------

function Update () {


}
