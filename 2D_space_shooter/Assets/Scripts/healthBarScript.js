#pragma strict

var healthArray : Array;
var healthPlup : Transform;
var lifeArray : Array;
var divisor : int = 2;

function Start(){
  var currPlup : Transform;
  healthArray = [];
  lifeArray = [];

  for (var i = 0; i < 100/divisor; i++) {
    currPlup = Instantiate(this.healthPlup, Vector2(0.015,0.05+0.005*i), Quaternion.identity);
    healthArray.Push(currPlup.gameObject);
    yield WaitForSeconds(0.05);
  }

/*  for (var it = 0; it < 3; it++) {
    currPlup = Instantiate(this.healthPlup, Vector2(0.06,-0.2+0.05*i), Quaternion.identity);
    lifeArray.Push(currPlup.gameObject);
    yield WaitForSeconds(0.05);
  }*/
}

// ------

function removeHealth(damage : int){
  damage = damage/divisor;
  for (var i = 0; i < damage; i++) {
    Destroy(healthArray.Pop());
    yield WaitForSeconds(0.05);
  }
}

// ------

function addHealth(life : int){
  life = life/divisor;
  for (var i = 0; i < life; i++) {
    if (healthArray.length >= 20) {
      break;
    }
    healthArray.Push(Instantiate(healthPlup, Vector2(Player_controls.Lowerboundry_x+0.1*i,Player_controls.Lowerboundry_y+0.1), Quaternion.identity));
    yield WaitForSeconds(0.05);
  }

}
// -------

function Update(){

}
