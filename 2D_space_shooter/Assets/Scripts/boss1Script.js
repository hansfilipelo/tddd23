#pragma strict
var rb : Component[];
var xMovement : float;
var speed : float;
var direction;
var life : int;
var shootCount : int;
var maxShootCount : int;
var yMovement : float;
var Explosion : Transform;
var player : GameObject;
var score = 1000;

var laser : Transform;

// -------

function moveBody(direction : Vector2, force : float){
  for (var i = 0; i < rb.length; i++) {
    var rbTemp : Rigidbody2D=rb[i];
    rbTemp.AddForce(direction * force);
  }
}

// -------

function getPosition() : Vector2{
  var rbTemp : Rigidbody2D=rb[0];
  return rbTemp.position;
}

//--------

function Start () {
	direction = "right";
	life = 200;
	maxShootCount = 30;
	shootCount = maxShootCount;
  yMovement = 2;
  speed = 2;
  rb = this.GetComponentsInChildren(Rigidbody2D);
  player = GameObject.Find("Player");
}

// -------

function hit(damage : int) {
	life -= damage;
	if (life <= 0) {
    player.SendMessage("score",score);
		Instantiate(Explosion, this.getPosition(), Quaternion.identity);
		Destroy(this.gameObject);
	}
}

// -------

function shoot(){
	if (shootCount > maxShootCount) {
		Instantiate(laser, this.getPosition() +Vector2(1.26,-1) , Quaternion.identity);
    Instantiate(laser, this.getPosition() +Vector2(-1.26,-1) , Quaternion.identity);
		shootCount = 0;
	}
	shootCount++;
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

  if (this.getPosition()[1] < 0.5) {
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
