#pragma strict

var rb: Rigidbody2D;
var speedMax : float;
var speedMin : float;
var Speed : float;
var spread : float;
var counter : float;
var scaler : float;
var xMovement : float;
var counterMax : float;

function Start() {
	counter=0;
	scaler=counterMax + 1;
	Speed = Random.Range(speedMin,speedMax);
	xMovement = Random.Range(-spread,spread);
}

function Update () {
	
	if (counter >= counterMax){
		xMovement = Random.Range(-spread,spread);
		counter = 1;
		scaler = counterMax + 1;
	}
	rb.MovePosition(rb.position + Vector2(0,-Speed) * Time.fixedDeltaTime);
	rb.AddForce(Vector2.right * xMovement);
	counter++;
	scaler--;
	
	if(rb.position[1] < -Player_controls.Upperboundry_y){
		Destroy(this.gameObject);
	}
}

