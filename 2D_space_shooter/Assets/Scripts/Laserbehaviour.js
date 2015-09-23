#pragma strict

var rb: Rigidbody2D;
var Speed : float;

function Update () {

	rb.MovePosition(rb.position + Vector2(0,Speed) * Time.fixedDeltaTime);

	if(rb.position[1] > 6){
		Destroy(this.gameObject);
	}

}

function OnCollisionEnter2D(collision : Collision2D) {

	
	if (collision.gameObject.name=="Playbutton") {

		Application.LoadLevel ("Level1");
	}else if(collision.gameObject.name=="Leaderboard"){

		Application.LoadLevel ("Leaderboard");
	}else if(collision.gameObject.name=="Backbutton"){
		Application.LoadLevel ("Startmenu");
	}else{
		collision.gameObject.SendMessage("hit", 10);; // destroy it
		Destroy(this.gameObject);
	}
}
