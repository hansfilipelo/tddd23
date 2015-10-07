#pragma strict
var rb : Rigidbody2D;
var PlayerLife : float;
var PlayerShip : Transform;
var healthBar : Transform;
var clone : Transform;

function Awake(){
	DontDestroyOnLoad (this.gameObject);
}

function Start () {
		clone = Instantiate(PlayerShip, rb.position, Quaternion.identity);
		clone.name = "Player ship";
}

function setHealthBar(){
	yield WaitForSeconds(0.7);
	healthBar = Instantiate(healthBar);
	clone.SendMessage("setHealthBar",healthBar);
}

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
		healthBar.SendMessage("addLife",100);
		clone.SendMessage("setHealthBar",healthBar);
		}
}

function Update () {


}
