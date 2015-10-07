#pragma strict

var healthArray : Array;
var healthPlup : Transform;
var lifeArray : Array;
var divisor : int = 2;

function Awake(){
	DontDestroyOnLoad (this.gameObject);
}

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
    if (healthArray.length <= 0) {
      break;
    }
    Destroy(healthArray.Pop());
    yield WaitForSeconds(0.05);
  }
}

// ------

function addHealth(life : int){
  life = life/divisor;
  for (var i = 0; i < life; i++) {
    if (healthArray.length >= 100/divisor) {
      break;
    }
    healthArray.Push(Instantiate(this.healthPlup, Vector2(0.015,0.05+0.005*i), Quaternion.identity).gameObject);
    yield WaitForSeconds(0.05);
  }

}

// -------

function clearBar(){
  for (var it = 0; it < healthArray.length; it++) {
    Destroy(healthArray.Pop());
  }
}

// -------

function restoreHealth(){
  var i = 0;
  while (healthArray.length < 100/divisor){
    if (i >= healthArray.length){
      healthArray.Push(Instantiate(this.healthPlup, Vector2(0.015,0.05+0.005*i), Quaternion.identity).gameObject);
      yield WaitForSeconds(0.1);
    }
    i++;
  }
}

// -------

function Update(){

}
