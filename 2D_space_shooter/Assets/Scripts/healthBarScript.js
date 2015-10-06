#pragma strict

var healthArray : Array;
var healthPlup : Transform;
var lifeArray : Array;

function Start(){
  var currPlup : Transform;
  healthArray = [];
  lifeArray = [];
  for (var i = 0; i < 100; i++) {
    currPlup = Instantiate(this.healthPlup, Vector2(0.015,0.03+0.004*i), Quaternion.identity);
    healthArray.Push(currPlup.gameObject);
  }
  for (var it = 0; it < 3; it++) {
    currPlup = Instantiate(this.healthPlup, Vector2(0.05,0.03+0.005*i), Quaternion.identity);
    lifeArray.Push(currPlup.gameObject);
  }
}

// ------

function removeHealth(damage : int){
  for (var i = 0; i < damage; i++) {
    Destroy(healthArray.Pop());
  }
}

// ------

function addHealth(life : int){
  for (var i = 0; i < life; i++) {
    if (healthArray.length >= 100) {
      break;
    }
    healthArray.Push(Instantiate(healthPlup, Vector2(Player_controls.Lowerboundry_x+0.1*i,Player_controls.Lowerboundry_y+0.1), Quaternion.identity));
  }

}
// -------

function Update(){

}
