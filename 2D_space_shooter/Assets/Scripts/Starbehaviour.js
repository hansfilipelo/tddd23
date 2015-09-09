#pragma strict

var maxSpeed : float;
var minSpeed : float;
var rb : Rigidbody2D;
var speed : float;

function Start () {
speed = Random.Range(minSpeed,maxSpeed);
}

function Update () {
	rb.MovePosition(rb.position + Vector2(0,-speed) * Time.fixedDeltaTime);
	
	if(rb.position[1] < -6){
		Destroy(this.gameObject);
	}
}