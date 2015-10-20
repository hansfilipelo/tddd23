#pragma strict


var rb : Rigidbody2D;
static var PlayerLife : int;
var PlayerShip : Transform;
var healthBar : Transform;
var healthBarPrefab : Transform;
var clone : Transform;
static var myScore : int;
static var level : int;
static var myName : String;
var scoreText : GUIText;

var	deathText: GameObject;
var	deathTimeText: GameObject;
var deathTime : int;
var Dead : boolean = false;

function Awake(){
	DontDestroyOnLoad (this.gameObject);
}

// --------

function Start () {
	PlayerLife=3;
	clone = Instantiate(PlayerShip, rb.position, Quaternion.identity);
	clone.name = "Player ship";
	level = 1;
	myScore = 0;
	myName = "Benke";
}

// --------

function setHealthBar(){
	yield WaitForSeconds(0.7);
	scoreText = GameObject.Find("scoreText").GetComponent.<GUIText>();
	this.score(0);
	healthBar = Instantiate(healthBarPrefab,Vector2(0,0), Quaternion.identity);
	clone.SendMessage("setHealthBar",healthBar);
}

// --------

function score(nr : int){
	myScore += nr;
	scoreText.text = "Score: " + myScore;
}

// -----

function waitForName(){
	clone.gameObject.SendMessage("waitForName");
}

// ------

function stopWaitingForName(){
	clone.gameObject.SendMessage("stopWaitingForName");
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

function saveScoreHelper(name : Object, score : int, it : int){

	while (it < 10) {
		var currHighScore = this.loadHighScore(it);
		var currHighScoreName = this.loadHighScoreName(it);

		if (currHighScoreName == "none") {
			PlayerPrefs.SetInt("highScore" + it,score);
			PlayerPrefs.SetString("highScoreName" + it,name);
			break;
		}

		if (score > currHighScore) {
			this.saveScoreHelper(currHighScoreName,currHighScore,it);
			PlayerPrefs.SetInt("highScore" + it,score);
			PlayerPrefs.SetString("highScoreName" + it,name);
			break;
		}
		it++;
	}

	PlayerPrefs.Save();
}

// --------

function saveScore(){
	saveScoreHelper(myName,myScore,0);
}
// --------

function safeDestroy(){
	yield WaitForSeconds(0.5);
	Destroy(healthBar.gameObject);
	//Destroy(this);
}

// --------

function setScoreBoard(){
	var leaderBoardText = "\n";
	var name;
	var score;

	for (var i = 0; i < 10; i++) {
		name = this.loadHighScoreName(i);
		score = this.loadHighScore(i);

		leaderBoardText += name + "  " + score + "\n\n";
	}



	GameObject.Find("leaderBoard").SendMessage("setLeaderBoard",leaderBoardText);
}

// --------

function Death(){
	PlayerLife-=1;
	deathText = GameObject.Find("deathText");
	deathTimeText = GameObject.Find("deathTimeText");

	if (PlayerLife<=0){
		this.saveScore();
		Destroy(this.gameObject);
		Destroy(clone.gameObject);
		Destroy(healthBar.gameObject);
		Application.LoadLevel ("GameOver");
	}else{
		Destroy(clone.gameObject);
		deathTime = Time.time+4;
		Dead = true;
		//this.SendMessage("safeDestroy");
		deathText.GetComponent(UI.Text).text = "respawn in";
	}
}

// -------

function levelUp(){
	this.level += 1;
	yield WaitForSeconds(3);
}

// -------

function Update () {

	if(Dead){
		if(deathTime-Time.time >= 3){
			deathTimeText.GetComponent(UI.Text).text = "3";
		}else if(deathTime-Time.time>=2){
			deathTimeText.GetComponent(UI.Text).text = "2";
		}else if(deathTime-Time.time>=1){
			deathTimeText.GetComponent(UI.Text).text = "1";
		}else if(deathTime-Time.time>=0){
			Destroy(healthBar.gameObject);
			Application.LoadLevel (Application.loadedLevel);
			clone = Instantiate(PlayerShip, rb.position, Quaternion.identity);
			clone.name = "Player ship";
			clone.SendMessage("Start");
			Dead = false;
		}
	}
}
