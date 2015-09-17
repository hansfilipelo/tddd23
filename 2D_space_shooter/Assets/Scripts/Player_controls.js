
#pragma strict

var MoveUp : KeyCode;
var MoveDown : KeyCode;
var MoveLeft : KeyCode;
var MoveRight : KeyCode;
var Shoot : KeyCode;
var Speed : float;
var shootCount : int=0;
var life : float;

var rb : Rigidbody2D;

static var Upperboundry_x : float=7;
static var Upperboundry_y : float=5;
static var Lowerboundry_x : float=-7;
static var Lowerboundry_y : float=-5;

var laser : Transform;

var v2 : Vector2=Vector2(0,0);

function Update () {
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
    v2 = Vector2(0,0);
	
	if(Input.GetKey(Shoot))
	{
		if (shootCount >= 10){
				Instantiate(laser, rb.position +Vector2(0,1) , Quaternion.identity);
				shootCount = 0;
			}
	}
	
	shootCount++;
}

// Collition detection

function OnCollisionEnter2D(collision : Collision2D) { 
	life -= 10;
	Destroy(collision.gameObject);
	
	if(life <= 0){
		Destroy(this.gameObject);
		Application.LoadLevel ("Startmenu");
	}
}

