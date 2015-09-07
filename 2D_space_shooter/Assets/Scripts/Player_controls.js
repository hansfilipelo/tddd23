
#pragma strict

var MoveUp : KeyCode;
var MoveDown : KeyCode;
var MoveLeft : KeyCode;
var MoveRight : KeyCode;
var Shoot : KeyCode;
var Speed : float;
var shootCount : int=0;

var rb : Rigidbody2D;

var Upperboundry_x : float;
var Upperboundry_y : float;
var Lowerboundry_x : float;
var Lowerboundry_y : float;

var laser : Transform;

function Update () {
	if (Input.GetKey(MoveUp) && rb.position[1] < Upperboundry_y)
	{
	rb.MovePosition(rb.position + Vector2(0,Speed) * Time.fixedDeltaTime);
	}
	else if(Input.GetKey(MoveDown) && rb.position[1] > Lowerboundry_y)
	{
	rb.MovePosition(rb.position + Vector2(0,-Speed) * Time.fixedDeltaTime);
	}
	else if(Input.GetKey(MoveLeft) && rb.position[0] > Lowerboundry_x)
	{
	rb.MovePosition(rb.position + Vector2(-Speed,0) * Time.fixedDeltaTime);
	}
	else if(Input.GetKey(MoveRight) && rb.position[0] < Upperboundry_x)
	{
	rb.MovePosition(rb.position + Vector2(Speed,0) * Time.fixedDeltaTime);
	}
	
	if(Input.GetKey(Shoot))
	{
		if (shootCount >= 10){
				Instantiate(laser, rb.position +Vector2(0,1) , Quaternion.identity);
				shootCount = 0;
			}
	}
	
	shootCount++;
}