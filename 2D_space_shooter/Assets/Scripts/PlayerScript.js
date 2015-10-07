#pragma strict
var rb : Rigidbody2D;
var PlayerLife : float;
var PlayerShip : Transform;

function Awake(){
	DontDestroyOnLoad (this.gameObject);
}

function Start () {
		var clone : Transform=Instantiate(PlayerShip, rb.position, Quaternion.identity);
		clone.name = "Player ship";
}

function Death(){
	PlayerLife-=1;
	if (PlayerLife<=0){
		Destroy(this.gameObject);
		Application.LoadLevel ("Startmenu");
	}else{
		Application.LoadLevel (Application.loadedLevel);
		var clone : Transform=Instantiate(PlayerShip, rb.position, Quaternion.identity);
		clone.name = "Player ship";
		}
}

function Update () {


}