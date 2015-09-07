#pragma strict

var rb: Rigidbody2D;
var Speed : float;

function Update () {
	
	rb.MovePosition(rb.position + Vector2(0,Speed) * Time.fixedDeltaTime);
	
	if(rb.position[1] > 6){
		Destroy(this.gameObject);
	}
}