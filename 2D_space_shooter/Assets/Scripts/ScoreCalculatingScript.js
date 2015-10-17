#pragma strict
var ScoreInc: int=0;
var ScoreMultiplier: int=0;
var ScoreTotal: int=0;

var	ScoreText : GameObject;
var	MultiplierText : GameObject;
var	TotalText : GameObject;



function Start () {

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
		ScoreInc+=20;
	}

 	
}