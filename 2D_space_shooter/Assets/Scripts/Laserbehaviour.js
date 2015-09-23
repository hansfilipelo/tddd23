#pragma strict

var rb: Rigidbody2D;
var hitSound : AudioClip;
var Speed : float;
var Explosion : Transform;
function Update () {
	
	rb.MovePosition(rb.position + Vector2(0,Speed) * Time.fixedDeltaTime);
	
	if(rb.position[1] > 6){
		Destroy(this.gameObject);
	}
	
}

function OnCollisionEnter2D(collision : Collision2D) { 

     	if (collision.gameObject.name=="Playbutton") {
     		
     		
     		Application.LoadLevel ("mainScene");
   		}else if(collision.gameObject.name=="Leaderboard"){
   	
     		
     		
     		Application.LoadLevel ("Leaderboard");
     	}else if(collision.gameObject.name=="Backbutton"){
     		
     		
     		Application.LoadLevel ("Startmenu");
     	}else{
     		AudioSource.PlayClipAtPoint(hitSound, rb.position);
     		Instantiate(Explosion, rb.position, Quaternion.identity);
        	Destroy(collision.gameObject); // destroy it
       		Destroy(this.gameObject);
    }
}

