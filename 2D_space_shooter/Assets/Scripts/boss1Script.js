#pragma strict
var rb: Rigidbody2D;
var xMovement : float;
var speed : float;
var direction;
var life : int;
var shootCount : int;
var maxShootCount : int;
var yMovement : float;
var Explosion : Transform;

var laser : Transform;

function Start () {
	direction = "right";
	life = 200;
	maxShootCount = 30;
	shootCount = maxShootCount;
  yMovement = 3;
  speed = 4;
}

// -------

function hit(damage : int) {
	life -= damage;
	if (life <= 0) {
		Instantiate(Explosion, rb.position, Quaternion.identity);
		Destroy(this.gameObject);
	}
}

// -------

function shoot(){
	if (shootCount > maxShootCount) {
		Instantiate(laser, rb.position +Vector2(1.26,-1) , Quaternion.identity);
    Instantiate(laser, rb.position +Vector2(-1.26,-1) , Quaternion.identity);
		shootCount = 0;
	}
	shootCount++;
}

// -------

function Update () {

	if(direction == "right"){
		rb.MovePosition(rb.position+ Vector2(1,0) * Time.fixedDeltaTime * speed);
		if(rb.position[0] > Player_controls.Upperboundry_x-0.5){
			direction = "left";
		}
	}
	else{
		rb.MovePosition(rb.position+ Vector2(-1,0) * Time.fixedDeltaTime * speed);
		if(rb.position[0] < Player_controls.Lowerboundry_x+0.5){
			direction = "right";
		}
	}

  if (rb.position[1] < 0.5) {
    rb.MovePosition(rb.position+ Vector2.up * Time.fixedDeltaTime * yMovement);;
  }
  else {
    rb.MovePosition(rb.position+ Vector2.down * Time.fixedDeltaTime * yMovement);;
  }

  shoot();

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
