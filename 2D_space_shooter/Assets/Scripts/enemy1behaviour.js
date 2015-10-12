#pragma strict

var rb: Rigidbody2D;
var xMovement : float;
var Speed : float;
var movementVector : Vector2;
var life : int;
var Explosion : Transform;

function Start () {
	life = 20;
	movementVector = Vector2(xMovement,-Speed);
}

function hit(damage : int) {
	life -= damage;
	if (life <= 0) {
		Instantiate(Explosion, rb.position, Quaternion.identity);
		Destroy(this.gameObject);
	}
}

function Update () {
	rb.MovePosition(rb.position + movementVector * Time.fixedDeltaTime);

	if(rb.position[1] < Player_controls.Lowerboundry_y){
		Destroy(this.gameObject);
	}
}

function OnCollisionEnter2D(collision : Collision2D) {
	if (collision.gameObject.name == "Player ship") {
		collision.gameObject.SendMessage("hit", 50);
		Instantiate(Explosion, rb.position, Quaternion.identity);
		Destroy(this.gameObject);
	}
}
