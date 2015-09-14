#pragma strict

var rb: Rigidbody2D;
var speedMax : float;
var speedMin : float;
var Speed : float;
var spread : float;
var counter : float=0;
var xMovement : float;

function Start() {
	Speed = Random.Range(speedMin,speedMax);
	xMovement = Random.Range(-spread,spread);
}

function Update () {
	
	if (counter >= 500){
		xMovement = Random.Range(-spread,spread);
	}
	rb.MovePosition(rb.position + Vector2(xMovement,-Speed) * Time.fixedDeltaTime);
	counter++;
}

