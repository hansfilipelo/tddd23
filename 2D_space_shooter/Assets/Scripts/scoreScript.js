#pragma strict

var textPlaceHolder : UI.Text;
var myScore : int;
var myName="Gustaf";

function Awake(){
	DontDestroyOnLoad (this.gameObject);
}

// ------

function setText(newText){
  textPlaceHolder.text = newText;
}

// -----

function setScore(score : int){
	myScore = score;
  this.setText("Score: " + score);
}

// ---------



function Start () {

}

function Update () {

}
