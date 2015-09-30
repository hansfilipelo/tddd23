﻿
#pragma strict

var MoveUp : KeyCode;
var MoveDown : KeyCode;
var MoveLeft : KeyCode;
var MoveRight : KeyCode;
var Shoot : KeyCode;

var controllerAvail : int;
var joyX : float;
var joyY : float;
var rightTrigger : float;
var deadZone : float;

var Speed : float;
var shootCount : int=0;
var life : float;

var Explosion : Transform;
var rb : Rigidbody2D;

static var Upperboundry_x : float=3.5;
static var Upperboundry_y : float=5;
static var Lowerboundry_x : float=-3.5;
static var Lowerboundry_y : float=-5;

var laser : Transform;

var v2 : Vector2=Vector2(0,0);

function Start(){

	if(Input.GetJoystickNames().length > 0){
		controllerAvail = 1;
	}
	else{
		controllerAvail = 0;
	}
	deadZone = 0.4;
}

// -------

function hit(damage : int) {
	life -= damage;
	if (life <= 0) {
		Instantiate(Explosion, rb.position, Quaternion.identity);
		Destroy(this.gameObject);
		Application.LoadLevel("Startmenu");
	}
}

// -------

function Update () {

	// Movement
	if (controllerAvail) {
		joyX = Input.GetAxis("Horizontal");
		joyY = Input.GetAxis("Vertical");
		rightTrigger = Input.GetAxis("Fire1");

		// Move Horizontally
		if (joyX > deadZone && rb.position[0] < Upperboundry_x) {
			v2 += Vector2(joyX,0);
		}
		else if(joyX < -deadZone && rb.position[0] > Lowerboundry_x) {
			v2 += Vector2(joyX,0);
		}
		// Move Vertically
		if (joyY > deadZone && rb.position[1] < Upperboundry_y) {
			v2 += Vector2(0,joyY);
		}
		else if (joyY < -deadZone && rb.position[1] > Lowerboundry_y) {
			v2 += Vector2(0,joyY);
		}

		rb.MovePosition(rb.position + Speed * v2 * Time.fixedDeltaTime);

		if(Input.GetButton("Fire1"))
		{
			if (shootCount >= 10){
					Instantiate(laser, rb.position +Vector2(0,0.8) , Quaternion.identity);
					shootCount = 0;
				}
		}
	}
	else{
		if (Input.GetKey(MoveUp) && rb.position[1] < Upperboundry_y)
		{
			v2 += Vector2(0,1);
		}
		if(Input.GetKey(MoveDown) && rb.position[1] > Lowerboundry_y)
		{
			v2 += Vector2(0,-1);
		}
		if(Input.GetKey(MoveLeft) && rb.position[0] > Lowerboundry_x)
		{
			v2 += Vector2(-1,0);
		}
		if(Input.GetKey(MoveRight) && rb.position[0] < Upperboundry_x)
		{
			v2 += Vector2(1,0);
		}

		rb.MovePosition(rb.position + Speed * v2.normalized * Time.fixedDeltaTime);

		if(Input.GetKey(Shoot))
		{
			if (shootCount >= 10){
					Instantiate(laser, rb.position +Vector2(0,0.8) , Quaternion.identity);
					shootCount = 0;
				}
		}
	}

  v2 = Vector2(0,0);
	shootCount++;
}
