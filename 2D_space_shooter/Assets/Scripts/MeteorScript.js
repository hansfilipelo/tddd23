#pragma strict

var meteor1 : Transform;
var meteor2 : Transform;
var meteor3 : Transform;
var meteorArray : Array;
var Spawnrate : float;
var spawnRateFrom : float;
var spawnRateTo : float;
internal var nextSpawn : float;


//----

function Start () {
	meteorArray=[meteor1];
}

function Spawn_meteor(){
	nextSpawn = Time.time + Spawnrate;
	
	for (var i = 0; i < Mathf.Floor(Random.Range(spawnRateFrom,spawnRateTo)); i++) {
		var currentMeteor = Mathf.Floor(Random.Range(0,meteorArray.length));
		Instantiate(meteorArray[currentMeteor], Vector2(Random.Range(Player_controls.Upperboundry_x, Player_controls.Lowerboundry_x),6) , Quaternion.identity);
	}
}

// -----

function Update () {
	if(Time.time > nextSpawn){
		Spawn_meteor();
	}
}
