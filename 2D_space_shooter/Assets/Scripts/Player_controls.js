
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