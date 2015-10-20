#pragma strict
var explosion : Transform;
var textspawntime : float;
var text1spawned : int;
var text2spawned : int;
var loadtime : float;
var Text : GameObject;
var explosionSound : AudioClip;
var explosionsounddelay : float;
var player : GameObject;
var playerShip : GameObject;

function Start () {
player = GameObject.Find("Player");
playerShip = player.Find("Player ship");
textspawntime=Time.time + textspawntime;
loadtime=Time.time + loadtime;
text1spawned=0;
text2spawned=0;
Text = GameObject.Find("Game over text");
}

function Update () {
	Instantiate(explosion , Vector2(Random.Range(7, -7),Random.Range(7,-7)) , Quaternion.identity);
	if(Time.time>explosionsounddelay){
	AudioSource.PlayClipAtPoint(explosionSound, Vector2(0,0));
	explosionsounddelay=Time.time + explosionsounddelay;
	}
	
	if(!text1spawned && Time.time>textspawntime){
		Text.GetComponent(UI.Text).text = "game";
		text1spawned=1;
	}else if(!text2spawned && Time.time>textspawntime+1){
		Text.GetComponent(UI.Text).text = "game over";
		text2spawned=1;
	 }else if(Time.time>loadtime){
	 	player.SendMessage("saveScore");
	 	player.SendMessage("safeDestroy");
		Destroy(player);
		Destroy(playerShip.gameObject);
		Application.LoadLevel("Startmenu");
	}
}