#pragma strict

var rb: Rigidbody2D;
var Speed : float;
var pewSound : AudioClip;
var SmallExplosion : Transform;

function Start(){
	AudioSource.PlayClipAtPoint(pewSound,Vector2(0,0));
}

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
	Instantiate(SmallExplosion, rb.position, Quaternion.identity);
	Destroy(this.gameObject);
}
