#pragma strict
var meteorFab : Transform;
var meteorSpawn : float;
var meteorSpawnTime : float;
var meteorsSpawned : float;

function Start () {
	meteorsSpawned = 0;
	meteorSpawnTime = Time.time + meteorSpawn;
}

function Update () {
	if(!meteorsSpawned && Time.time > meteorSpawnTime){
		meteorsSpawned = 1;
		Instantiate(meteorFab, Vector2(Random.Range(Player_controls.Upperboundry_x, Player_controls.Lowerboundry_x),Player_controls.Upperboundry_y+1) , Quaternion.identity);
		Instantiate(meteorFab, Vector2(Random.Range(Player_controls.Upperboundry_x, Player_controls.Lowerboundry_x),Player_controls.Upperboundry_y+1) , Quaternion.identity);
		Instantiate(meteorFab, Vector2(Random.Range(Player_controls.Upperboundry_x, Player_controls.Lowerboundry_x),Player_controls.Upperboundry_y+1) , Quaternion.identity);
		Instantiate(meteorFab, Vector2(Random.Range(Player_controls.Upperboundry_x, Player_controls.Lowerboundry_x),Player_controls.Upperboundry_y+1) , Quaternion.identity);
	}
}