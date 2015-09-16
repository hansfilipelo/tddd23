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
     		
     		Application.LoadLevel ("mainScene");
   		}else if(collision.gameObject.name=="Leaderboard"){
     		yield WaitForSeconds(1);
     		Application.LoadLevel ("mainScene");
     	}else{
        	Destroy(collision.gameObject); // destroy it
       		Destroy(this.gameObject);
    }
}

