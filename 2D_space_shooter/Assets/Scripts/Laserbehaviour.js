#pragma strict

var rb: Rigidbody2D;
var hitSound : AudioClip;
var Speed : float;

var SmallExplosion : Transform;


var player : GameObject;
var playerShip : GameObject;

function Start(){
	player = GameObject.Find("Player");
	playerShip = player.Find("Player ship");
}


function hit(damage : int) {
}

function Update () {

	rb.MovePosition(rb.position + Vector2(0,Speed) * Time.fixedDeltaTime);

	if(rb.position[1] > 6){
		Destroy(this.gameObject);
	}

}

function OnCollisionEnter2D(collision : Collision2D) {

     	if (collision.gameObject.name=="Playbutton") {
     		Application.LoadLevel ("Level1");
				player.SendMessage("setHealthBar");
   		}else if(collision.gameObject.name=="Leaderboard"){
     		Application.LoadLevel ("Leaderboard");
     	}else if(collision.gameObject.name=="Backbutton"){
				Destroy(player);
				Destroy(playerShip.gameObject);
     		Application.LoadLevel ("Startmenu");
     	}else if(collision.gameObject.name=="enemyLaser(Clone)"){
     	}else{
     		AudioSource.PlayClipAtPoint(hitSound, rb.position);
        	collision.gameObject.SendMessage("hit", 10);
        	Instantiate(SmallExplosion, rb.position, Quaternion.identity);
       		Destroy(this.gameObject);
    }
}
