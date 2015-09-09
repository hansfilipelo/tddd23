#pragma strict

var Star1 : Transform;
var Star2 : Transform;
var Star3 : Transform;
var starArray : Array;
var Spawnrate : float;
internal var nextSpawn : float;

//----

function Start () {
	starArray=[Star1,Star2,Star3];
}

function Spawn_Star(){
	nextSpawn = Time.time + Spawnrate;
	
	for (var i = 0; i < Mathf.Floor(Random.Range(1,6)); i++) {
		Instantiate(starArray[Mathf.Floor(Random.Range(0,3))], Vector2(Random.Range(Player_controls.Upperboundry_x, Player_controls.Lowerboundry_x),6) , Quaternion.identity);
	}
}

function Update () {
	if(Time.time > nextSpawn){
		Spawn_Star();
	}
}


