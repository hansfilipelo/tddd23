#pragma strict

var healthArray : Array;
var healthPlup : Transform;
var lifeArray : Array;
var divisor : int = 4;
var distanceBetweenPlup : float = 0.02;
var boostSound : AudioClip;
var lifeSound : AudioClip;
var removeSound : AudioClip;
var LifeSprite : Transform;

function Awake(){
	DontDestroyOnLoad (this.gameObject);
}

function Start(){
  var currPlup : Transform;
  var currLife : Transform;
  healthArray = [];
  lifeArray = [];

	AudioSource.PlayClipAtPoint(lifeSound,Vector2(0,0));
	for(var j = 0; j<PlayerScript.PlayerLife;j++){
	yield WaitForSeconds(0.15);
	currLife = Instantiate(this.LifeSprite,Vector2(0.98,0.07+0.05*j), Quaternion.identity);
	lifeArray.Push(currLife.gameObject);
	}

	AudioSource.PlayClipAtPoint(boostSound,Vector2(0,0));
  for (var i = 0; i < 100/divisor; i++) {
    currPlup = Instantiate(this.healthPlup, Vector2(0.015,0.05+distanceBetweenPlup*i), Quaternion.identity);
    healthArray.Push(currPlup.gameObject);
    yield WaitForSeconds(0.02);
  }

/*  for (var it = 0; it < 3; it++) {
    currPlup = Instantiate(this.healthPlup, Vector2(0.06,-0.2+0.05*i), Quaternion.identity);
    lifeArray.Push(currPlup.gameObject);
    yield WaitForSeconds(0.05);
  }*/
}

// ------

function removeHealth(damage : int){
	AudioSource.PlayClipAtPoint(removeSound,Vector2(0,0));
  damage = damage/divisor;
  for (var i = 0; i < damage; i++) {
    if (healthArray.length <= 0) {
      break;
    }
    Destroy(healthArray.Pop());
    yield WaitForSeconds(0.02);
  }
}

// ------

function addHealth(life : int){
	AudioSource.PlayClipAtPoint(boostSound,Vector2(0,0));
  life = life/divisor;
  for (var i = 0; i < life; i++) {
    if (healthArray.length >= 100/divisor) {
      break;
    }
    healthArray.Push(Instantiate(this.healthPlup, Vector2(0.015,0.05+distanceBetweenPlup*i), Quaternion.identity).gameObject);
    yield WaitForSeconds(0.02);
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
	yield WaitForSeconds(0.5);
	AudioSource.PlayClipAtPoint(boostSound,Vector2(0,0));
  var i = 0;
  while (healthArray.length < 100/divisor){
    if (i >= healthArray.length){
      healthArray.Push(Instantiate(this.healthPlup, Vector2(0.015,0.05+distanceBetweenPlup*i), Quaternion.identity).gameObject);
      yield WaitForSeconds(0.02);
    }
    i++;
  }
}

// -------

function Update(){

}
