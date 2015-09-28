#pragma strict

var rb: Rigidbody2D;
var Speed : float;

function hit(damage : int) {
}

function Update () {

	rb.MovePosition(rb.position + Vector2(0,-Speed) * Time.fixedDeltaTime);

	if(rb.position[1] < Player_controls.Lowerboundry_y){
		Destroy(this.gameObject);
	}

}

function OnCollisionEnter2D(collision : Collision2D) {

	collision.gameObject.SendMessage("hit", 10);; // destroy it
	Destroy(this.gameObject);
}
