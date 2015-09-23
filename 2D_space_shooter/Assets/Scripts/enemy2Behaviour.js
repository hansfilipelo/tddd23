#pragma strict

var rb: Rigidbody2D;
var xMovement : float;
var speed : float;
var stopAndHoverPos : float;
var direction;
var life : int;

function Start () {
	direction = "right";
	stopAndHoverPos = Player_controls.Upperboundry_y-1.5;
	life = 60;
}

function hit(damage : int) {
	life -= damage;
	if (life <= 0) {
		Destroy(this.gameObject);
	}
}

function Update () {


	if(rb.position[1] < stopAndHoverPos && direction == "right"){
		rb.MovePosition(rb.position+ Vector2(1,0) * Time.fixedDeltaTime * speed);
		if(rb.position[0] > Player_controls.Upperboundry_x-0.5){
			direction = "left";
		}
	}
	else if(rb.position[1] < stopAndHoverPos && direction == "left"){
		rb.MovePosition(rb.position+ Vector2(-1,0) * Time.fixedDeltaTime * speed);
		if(rb.position[0] < Player_controls.Lowerboundry_x+0.5){
			direction = "right";
		}
	}
	else {
		rb.MovePosition(rb.position + Vector2(0,-1) * Time.fixedDeltaTime * speed);
	}

	if(rb.position[1] < Player_controls.Lowerboundry_y){
		Destroy(this.gameObject);
	}
}
