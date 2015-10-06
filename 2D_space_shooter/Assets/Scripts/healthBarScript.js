#pragma strict

var healthArray : Array;
var healthPlup : Transform;

function Start(){
  var currPlup : Transform;
  healthArray = [];
  for (var i = 0; i < 100; i++) {
    currPlup = Instantiate(this.healthPlup, Vector2(0.02,0.1+0.003*i), Quaternion.identity);
    healthArray.Push(currPlup.gameObject);
  }
}

// ------

function removeLife(damage : int){
  for (var i = 0; i < damage; i++) {
    Destroy(healthArray.Pop());
  }
}

// ------

function addLife(life : int){
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
