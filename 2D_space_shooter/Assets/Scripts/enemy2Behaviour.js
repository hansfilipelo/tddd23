#pragma strict

var rb: Rigidbody2D;
var xMovement : float;
var speed : float;
var stopAndHoverPos : float;
var direction;
var life : int;
var shootCount : int;
var maxShootCount : int;
var exitTime : float;
var laser : Transform;
var Explosion : Transform;
var player : GameObject;
var score = 20;



function Start () {
	direction = "right";
	stopAndHoverPos = Player_controls.Upperboundry_y-1.5;
	life = 60;
	maxShootCount = 40;
	shootCount = maxShootCount;
	exitTime += Time.time;
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
		Instantiate(laser, rb.position +Vector2(0,-0.7) , Quaternion.identity);
		shootCount = 0;
	}
	shootCount++;
}

// -------

function Update () {
	if(exitTime<Time.time){
		rb.MovePosition(rb.position+ Vector2(0,1) * Time.fixedDeltaTime * speed);
	}
	else if(rb.position[1] < stopAndHoverPos && direction == "right"){
		rb.MovePosition(rb.position+ Vector2(1,0) * Time.fixedDeltaTime * speed);
		if(rb.position[0] > Player_controls.Upperboundry_x-0.5){
			direction = "left";
		}
		shoot();
	}
	else if(rb.position[1] < stopAndHoverPos && direction == "left"){
		rb.MovePosition(rb.position+ Vector2(-1,0) * Time.fixedDeltaTime * speed);
		if(rb.position[0] < Player_controls.Lowerboundry_x+0.5){
			direction = "right";
		}
		shoot();
	}
	else {
		rb.MovePosition(rb.position + Vector2(0,-1) * Time.fixedDeltaTime * speed);
	}

	if(rb.position[1] > Player_controls.Upperboundry_y+2){
		Destroy(this.gameObject);
	}
}

// ---- Collision -------

function OnCollisionEnter2D(collision : Collision2D) {
	if (collision.gameObject.name == "Player ship") {
		collision.gameObject.SendMessage("hit", 50);
		Instantiate(Explosion, rb.position, Quaternion.identity);
		Destroy(this.gameObject);
	}
}
