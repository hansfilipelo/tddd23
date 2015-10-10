#pragma strict

var textPlaceHolder : UI.Text;

function Awake(){
	DontDestroyOnLoad (this.gameObject);
}

// ------

function setText(newText){
  textPlaceHolder.text = newText;
}

// -----

function setScore(score : int){
  this.setText("Score: " + score);
}

function Start () {

}

function Update () {

}
