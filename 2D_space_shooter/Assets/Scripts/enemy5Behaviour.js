#pragma strict

var rb: Rigidbody2D;
var Speed : float;
var movementVector : Vector2;
var life : int;
var shootCount : int;
var laser : Transform;
var maxShootCount : int;
var Explosion : Transform;
var player : GameObject;
var score = 20;

function Start () {
	life = 20;
	movementVector = Vector2(0,-Speed);
	maxShootCount = 30;
	shootCount = maxShootCount;
	player = GameObject.Find("Player");
}

// -------

function hit(damage : int) {
	life -= damage;
	if (life <= 0) {
		player.SendMessage("score",score);
		Instantiate(Explosion, rb.position, Quaternion.identity);
		Destroy(this.gameObject);
	}
	
}

// -------

function shoot(){
	if (shootCount > maxShootCount) {
		Instantiate(laser, rb.position +Vector2(0,-1) , Quaternion.identity);
		shootCount = 0;
	}
	shootCount++;
}

// -------

function Update () {
	rb.MovePosition(rb.position + movementVector * Time.fixedDeltaTime);

  shoot();

	if(rb.position[1] < Player_controls.Lowerboundry_y){
		Destroy(this.gameObject);
	}
}

// -------

function OnCollisionEnter2D(collision : Collision2D) {
	if (collision.gameObject.name == "Player ship") {
		collision.gameObject.SendMessage("hit", 50);
		Instantiate(Explosion, rb.position, Quaternion.identity);
		Destroy(this.gameObject);
	}
}
