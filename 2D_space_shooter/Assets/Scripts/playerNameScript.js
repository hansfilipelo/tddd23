#pragma strict
var nameText : UnityEngine.UI.InputField;
var enterPressed : int;
var player : GameObject;

function Start () {
  enterPressed = 0;
  nameText = GameObject.Find("enterNameText").GetComponent.<UnityEngine.UI.InputField>();
  player = GameObject.Find("Player");
}

function Update () {

}

// -----

function setName() {
  PlayerScript.myName = nameText.text;
  Application.LoadLevel("Level1");
  player.SendMessage("setHealthBar");
}
