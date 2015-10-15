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
var levelBarrier : float;

var player : GameObject;
var score = 20;
var edgeForMe : float;
var tempEdge : float;

var laser : Transform;

function Start () {
	if (Application.loadedLevel == 2) { // 2 is ID for Level1
		levelBarrier = 0;
	}
	else {
		levelBarrier = 3;
	}
	direction = "right";
	life = 30;
	maxShootCount = 40;
	shootCount = maxShootCount;
  yMovement = -0.3;
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
	if (!Player_controls.paused){
    shootCount++;
  }
}

// -------

function setEdge(edge : float){
	tempEdge = edge;
}

// -------


function Update () {
	edgeForMe = tempEdge;
	if(direction == "right"){
		rb.MovePosition(rb.position+ Vector2(1,yMovement) * Time.fixedDeltaTime * speed);
		if(rb.position[0] > Player_controls.Upperboundry_x-edgeForMe){
			direction = "left";
		}
		shoot();
	}
	else{
		rb.MovePosition(rb.position+ Vector2(-1,yMovement) * Time.fixedDeltaTime * speed);
		if(rb.position[0] < Player_controls.Lowerboundry_x+levelBarrier-edgeForMe){
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
		Instantiate(Explosion, rb.position, Quaternion.identity);
		Destroy(this.gameObject);
	}
}
