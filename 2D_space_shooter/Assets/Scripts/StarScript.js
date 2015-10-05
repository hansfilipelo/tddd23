#pragma strict

var Star1 : Transform;
var Star2 : Transform;
var Star3 : Transform;
var starArray : Array;
var Spawnrate : float;
var spawnStarMax : float;
var spawnStarMin : float;
internal var nextSpawn : float;

//----

function Start () {
	starArray=[Star1,Star2,Star3];

	// Create initial stars
	if (Application.loadedLevelName == "Startmenu") {
		for (var y = Player_controls.Lowerboundry_y; y < Player_controls.Upperboundry_y+1; y++) {
			for (var i = 0; i < Mathf.Floor(Random.Range(spawnStarMin,spawnStarMax)); i++) {
				Instantiate(starArray[Mathf.Floor(Random.Range(0,starArray.length))], Vector2(Random.Range(7, -7),y) , Quaternion.identity);
			}
		}
	}
	else {
		for (y = Player_controls.Lowerboundry_y; y < Player_controls.Upperboundry_y+1; y++) {
			for (i = 0; i < Mathf.Floor(Random.Range(spawnStarMin,spawnStarMax)); i++) {
				Instantiate(starArray[Mathf.Floor(Random.Range(0,starArray.length))], Vector2(Random.Range(Player_controls.Upperboundry_x, Player_controls.Lowerboundry_x),y) , Quaternion.identity);
			}
		}
	}
}

function Spawn_Star(){
	nextSpawn = Time.time + Spawnrate;

	for (var i = 0; i < Mathf.Floor(Random.Range(1,Player_controls.Upperboundry_y+1)); i++) {
		var currentStarPosition = Mathf.Floor(Random.Range(0,starArray.length));
		Instantiate(starArray[currentStarPosition], Vector2(Random.Range(Player_controls.Upperboundry_x, Player_controls.Lowerboundry_x),Player_controls.Upperboundry_y+1) , Quaternion.identity);
	}
}

function Update () {
	if(Time.time > nextSpawn){
		Spawn_Star();
	}
}
