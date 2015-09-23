#pragma strict

var rb: Rigidbody2D;
var xMovement : float;
var Speed : float;
var movementVector : Vector2;
var life : int;

function Start () {
	life = 40;
	movementVector = Vector2(xMovement,-Speed);
}

function hit(damage : int) {
	life -= damage;
	if (life <= 0) {
		Destroy(this.gameObject);
	}
}

function Update () {
	rb.MovePosition(rb.position + movementVector * Time.fixedDeltaTime);

	if(rb.position[1] < Player_controls.Lowerboundry_y){
		Destroy(this.gameObject);
	}
}
