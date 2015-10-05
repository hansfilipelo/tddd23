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
var life : int;
var Explosion : Transform;

function Start() {
	counter=0;
	scaler=counterMax + 1;
	Speed = Random.Range(speedMin,speedMax);
	xMovement = Random.Range(-spread,spread);
	life = 10;
}

function hit(damage : int) {
	life -= damage;
	if (life <= 0) {
		Instantiate(Explosion, rb.position, Quaternion.identity);
		Destroy(this.gameObject);
	}
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

function OnCollisionEnter2D(collision : Collision2D) {
	if (collision.gameObject.name == "Player ship") {
		collision.gameObject.SendMessage("hit", 50);
		Destroy(this.gameObject);
	}
}
