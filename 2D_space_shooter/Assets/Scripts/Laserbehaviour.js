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
     // if the hit object's name is Wall...
        Destroy(collision.gameObject); // destroy it
        Destroy(this.gameObject);
        Debug.Log("bla");
    }


