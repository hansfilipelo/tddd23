#pragma strict

var rb: Rigidbody2D;
var xMovement : float;
var Speed : float;
var movementVector : Vector2;

function Start () {
	movementVector = Vector2(xMovement,-Speed);
}

function Update () {
	rb.MovePosition(rb.position + movementVector * Time.fixedDeltaTime);
	
	if(rb.position[1] < Player_controls.Lowerboundry_y){
		Destroy(this.gameObject);
	}
}