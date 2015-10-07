#pragma strict

var rb : Rigidbody2D;
var Speed : float;
var movementVector : Vector2;

function Start () {
  movementVector = Vector2(0,-Speed);
}

function Update () {
  rb.MovePosition(rb.position + movementVector * Time.fixedDeltaTime);

  if(rb.position[1] < Player_controls.Lowerboundry_y){
    Destroy(this.gameObject);
  }
}


function OnCollisionEnter2D(collision : Collision2D) {
  if (collision.gameObject.name == "Player ship") {
    collision.gameObject.SendMessage("restoreHealth");
    Destroy(this.gameObject);
  }
}
