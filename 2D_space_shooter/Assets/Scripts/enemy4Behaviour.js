#pragma strict

var rb: Rigidbody2D;
var xMovement : float;
var speed : float;
var direction;
var life : int;
var shootCount : int;
var maxShootCount : int;
var yMovement : float;

var laser : Transform;

function Start () {
	direction = "right";
	life = 30;
	maxShootCount = 40;
	shootCount = maxShootCount;
  yMovement = -0.3;
}

// -------

function hit(damage : int) {
	life -= damage;
	if (life <= 0) {
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

	if(direction == "right"){
		rb.MovePosition(rb.position+ Vector2(1,yMovement) * Time.fixedDeltaTime * speed);
		if(rb.position[0] > Player_controls.Upperboundry_x-0.5){
			direction = "left";
		}
		shoot();
	}
	else{
		rb.MovePosition(rb.position+ Vector2(-1,yMovement) * Time.fixedDeltaTime * speed);
		if(rb.position[0] < Player_controls.Lowerboundry_x+0.5){
			direction = "right";
		}
		shoot();
	}

	if(rb.position[1] < Player_controls.Lowerboundry_y){
		Destroy(this.gameObject);
	}
}

// ---- Collision -------

function OnCollisionEnter2D(collision : Collision2D) {
	if (collision.gameObject.name == "Player ship") {
		collision.gameObject.SendMessage("hit", 50);
		Destroy(this.gameObject);
	}
}
