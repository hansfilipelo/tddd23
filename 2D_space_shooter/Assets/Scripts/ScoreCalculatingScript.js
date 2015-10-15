#pragma strict
var ScoreInc: int=0;
var ScoreMultiplier: int=0;
var ScoreTotal: int=0;

var	ScoreText : GameObject;
var	MultiplierText : GameObject;
var	TotalText : GameObject;
var scoreDone : int;

var PlayerScore : int;
var PlayerPlayerLife : int;
var player : GameObject;

function Start () {
	//var player = GameObject.Find("Player");
	//PlayerScore = player.myScore;
	//PlayerPlayerLife = player.PlayerLife;
	ScoreText = GameObject.Find("Score");
	MultiplierText = GameObject.Find("Multipliervalue");
	TotalText = GameObject.Find("FinalScore");
	MultiplierText.GetComponent(UI.Text).text="x " + PlayerScript.PlayerLife;
	player = GameObject.Find("Player");
	scoreDone = 0;
}

// --------

function loadNextLevel(){
	player.SendMessage("score",PlayerScript.myScore*PlayerScript.PlayerLife-PlayerScript.myScore);
	player.SendMessage("levelUp");
	yield WaitForSeconds(2);
	var levelString = "Level" + PlayerScript.level;
	Application.LoadLevel(levelString);
}

// --------

function Update () {
if(ScoreInc<=PlayerScript.myScore){
		ScoreText.GetComponent(UI.Text).text = ": " + ScoreInc;
		ScoreInc+=20;
	}else if(ScoreTotal<=PlayerScript.PlayerLife*PlayerScript.myScore){
		TotalText.GetComponent(UI.Text).text = ": " + ScoreTotal;
		ScoreTotal+=50;
	}
	else if (scoreDone == 0){
		scoreDone = 1;
	}

	if (scoreDone == 1) {
		scoreDone = -1;
		this.gameObject.SendMessage("loadNextLevel");
	}
}
