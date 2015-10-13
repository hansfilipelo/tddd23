#pragma strict
var ScoreInc: int=0;
var ScoreMultiplier: int=0;
var ScoreTotal: int=0;

var	ScoreText : GameObject;
var	MultiplierText : GameObject;
var	TotalText : GameObject;

var PlayerScore : int;
var PlayerPlayerLife : int;

function Start () {
	//var player = GameObject.Find("Player");
	//PlayerScore = player.myScore;
	//PlayerPlayerLife = player.PlayerLife;
	ScoreText = GameObject.Find("Score");
	MultiplierText = GameObject.Find("Multipliervalue");
	TotalText = GameObject.Find("FinalScore");
	MultiplierText.GetComponent(UI.Text).text="x " + PlayerScript.PlayerLife;
}

function Update () {
if(ScoreInc<=PlayerScript.myScore){
		ScoreText.GetComponent(UI.Text).text = ": " + ScoreInc;
		ScoreInc+=10;
	}else if(ScoreTotal<=PlayerScript.PlayerLife*PlayerScript.myScore){
		TotalText.GetComponent(UI.Text).text = ": " + ScoreTotal;
		ScoreInc+=10;
	}

 	
}