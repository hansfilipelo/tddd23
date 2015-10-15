
#pragma strict

var MoveUp : KeyCode;
var MoveDown : KeyCode;
var MoveLeft : KeyCode;
var MoveRight : KeyCode;
var Shoot : KeyCode;
var pause : KeyCode;

var controllerAvail : int;
var joyX : float;
var joyY : float;
var rightTrigger : float;
var deadZone : float;

var Speed : float;
var shootCount : int=0;
static var paused : int;
var life : float;
var lastShootTime : float;
var shootDelay : float;
var platform;

var Explosion : Transform;
var SmallExplosion : Transform;
var rb : Rigidbody2D;
var healthBar : Transform;

static var Upperboundry_x : float=3.5;
static var Upperboundry_y : float=5;
static var Lowerboundry_x : float=-3.5;
static var Lowerboundry_y : float=-5;

var laser : Transform;

var v2 : Vector2=Vector2(0,0);

//var player : PlayerScript;

function Awake(){
	DontDestroyOnLoad (this.gameObject);
}


function Start(){

	// XBOX controller is reporting different keylayout on Mac vs Linux and Windows.
	if ( Application.platform == RuntimePlatform.OSXPlayer || Application.platform == RuntimePlatform.OSXEditor ) {
		platform = "MacOS";
	}

	paused = 0;
	shootDelay = 0.2;

	if(Input.GetJoystickNames().length > 0){
		controllerAvail = 1;
	}
	else{
		controllerAvail = 0;
	}
	deadZone = 0.4;
}

// -------

function setHealthBar(bar : Transform){
	healthBar = bar;
}

// -------

function hit(damage : int) {
	life -= damage;
	healthBar.gameObject.SendMessage("removeHealth",damage);
	if (life <= 0) {
		Instantiate(Explosion, rb.position, Quaternion.identity);
		var player = GameObject.Find("Player");
		player.GetComponent(PlayerScript).Death();
		Destroy(this);
	}else{
		Instantiate(SmallExplosion, rb.position, Quaternion.identity);
	}
}

// ------

function restoreHealth(){
	life = 100;
	healthBar.SendMessage("restoreHealth");
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
			if (Time.time - lastShootTime >= shootDelay){
					Instantiate(laser, rb.position +Vector2(0,0.8) , Quaternion.identity);
					lastShootTime = Time.time;
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
			if (Time.time - lastShootTime >= shootDelay){
					Instantiate(laser, rb.position +Vector2(0,0.8) , Quaternion.identity);
					lastShootTime = Time.time;
				}
		}
	}

	if (platform != "MacOS") {
		if( Input.GetKeyDown(pause) || Input.GetKeyDown("joystick button 7") ) {
			if (!paused) {
				Time.timeScale = 0;
				lastShootTime = Time.time;
				paused = 1;
			}
			else {
				Time.timeScale = 1;
				paused = 0;
			}
		}
	}
	else {
		if( Input.GetKeyDown(pause) || Input.GetKeyDown("joystick button 9") ) {
			if (!paused) {
				Time.timeScale = 0;
				lastShootTime = Time.time;
				paused = 1;
			}
			else {
				Time.timeScale = 1;
				paused = 0;
			}
		}
	}

	v2 = Vector2(0,0);
}
