#pragma strict

var player : GameObject;
var leaderBoard : GUIText;

function Start () {
  //leaderBoard = this.GetComponent.<GUIText>();
  player = GameObject.Find("Player");

  player.SendMessage("setScoreBoard");
}

// -------

// -------

function setLeaderBoard(inText){
  Debug.Log(inText);
  leaderBoard.text = inText;
}

function Update () {

}
