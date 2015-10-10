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

function loadHighScore(pos : int){
	if (PlayerPrefs.HasKey("highScore" + pos)) {
		return PlayerPrefs.GetInt("highScore" + pos);
	}

	return 0;
}

function loadHighScoreName(it : int){
	if (PlayerPrefs.HasKey("highScoreName" + it)) {
		return PlayerPrefs.GetString("highScoreName" + it);
	}
	return "none";
}

// -----

function saveScore(name, score : int, it : int){

	while (it < 10) {
		var currHighScore = this.loadHighScore(it);
		var currHighScoreName = this.loadHighScoreName(it);

		if (currHighScoreName == "none") {
			PlayerPrefs.SetInt("highScore" + it,score);
			PlayerPrefs.SetString("highScoreName" + it,name);
			break;
		}

		if (score > currHighScore) {
			this.saveScore(currHighScoreName,currHighScore,it);
			PlayerPrefs.SetInt("highScore" + it,score);
			PlayerPrefs.SetString("highScoreName" + it,name);
			break;
		}
		it++;
	}

	PlayerPrefs.Save();
}

// --------

function setScoreBoard(){
	var leaderBoardText = "Highscore \n";
	leaderBoardText += "---------\n\n";

	var name;
	var score;

	for (var i = 0; i < 10; i++) {
		name = this.loadHighScoreName(i);
		score = this.loadHighScore(i);

		leaderBoardText += name + "  " + score + "\n";
	}


	Debug.Log(leaderBoardText);
	GameObject.Find("leaderBoard").SendMessage("setLeaderBoard",leaderBoardText);
}

// --------

function Death(){
	PlayerLife-=1;
	if (PlayerLife<=0){
		this.saveScore("Gustaf",myScore,0);
		Destroy(clone.gameObject);
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
