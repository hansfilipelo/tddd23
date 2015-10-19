#pragma strict
var rb : Rigidbody2D;
var xMovement : float;
var speed : float;
var direction;
var life : int;
var shootCount : int;
var maxShootCount : int;
var yMovement : float;
var Explosion : Transform;
var player : GameObject;
var score : int;

var laser : Transform;

// -------

function moveBody(direction : Vector2, force : float){
    rb.AddForce(direction * rb.mass * force);
}

// -------

function getPosition() : Vector2{
  return rb.position;
}

//--------

function Start () {
  score = 2000;
	direction = "right";
	life = 200;
	maxShootCount = 35;
	shootCount = maxShootCount;
  yMovement = 2;
  speed = 2;
  rb = this.GetComponent(Rigidbody2D);
  player = GameObject.Find("Player");
}

// -------

function goToTransition(){
  yield WaitForSeconds(3);
  Application.LoadLevel("Transition");
  Destroy(this.gameObject);
}

// ------

function hit(damage : int) {
	life -= damage;
	if (life <= 0) {
   		player.SendMessage("score",score);
		Instantiate(Explosion, this.getPosition(), Quaternion.identity);
		this.SendMessage("goToTransition");
	}
}

// -------

function shoot(){
	if (shootCount > maxShootCount) {
		Instantiate(laser, this.getPosition() +Vector2(1.26,-2) , Quaternion.identity);
    Instantiate(laser, this.getPosition() +Vector2(-1.26,-2) , Quaternion.identity);
    Instantiate(laser, this.getPosition() +Vector2(0,-2) , Quaternion.identity);
		shootCount = 0;
	}
  if (!Player_controls.paused){
    shootCount++;
  }
}

// -------

function Update () {

	if(direction == "right"){
    if (this.getPosition()[0] < Player_controls.Lowerboundry_x+1) {
      moveBody(Vector2.right, speed);
    }
    else {
      moveBody(Vector2.right, speed*0.1);
    }
		if(this.getPosition()[0] > Player_controls.Upperboundry_x-0.5){
			direction = "left";
		}
	}
	else{
    if (this.getPosition()[0] > Player_controls.Upperboundry_x-1) {
      moveBody(Vector2.left, speed);
    }
    else {
      moveBody(Vector2.left, speed*0.1);
    }
		if(this.getPosition()[0] < Player_controls.Lowerboundry_x+1){
			direction = "right";
		}
	}

  if (this.getPosition()[1] < 1.5) {
    moveBody(Vector2.up, yMovement);
  }
  else {
    moveBody(Vector2.down, yMovement);
  }

  shoot();

	if(this.getPosition()[1] < Player_controls.Lowerboundry_y){
		Destroy(this.gameObject);
	}
}

// ---- Collision -------

function OnCollisionEnter2D(collision : Collision2D) {
	if (collision.gameObject.name == "Player ship") {
		collision.gameObject.SendMessage("hit", 50);
	}
}
