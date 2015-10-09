﻿#pragma strict
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
	healthBar = Instantiate(healthBar);
	clone.SendMessage("setHealthBar",healthBar);
}

// --------

function score(nr : int){
	myScore += nr;
	scoreText.text = "Score: " + myScore;
}

// --------

function Death(){
	PlayerLife-=1;
	if (PlayerLife<=0){
		Destroy(this.gameObject);
		Application.LoadLevel ("Startmenu");
	}else{
		Application.LoadLevel (Application.loadedLevel);
		Destroy(clone.gameObject);
		clone = Instantiate(PlayerShip, rb.position, Quaternion.identity);
		clone.name = "Player ship";
		clone.SendMessage("Start");
		clone.SendMessage("setHealthBar",healthBar);
		healthBar.SendMessage("clearBar");
		healthBar.SendMessage("restoreHealth");
		}
}

function Update () {


}
