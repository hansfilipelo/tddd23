#pragma strict

// ----------
// Spawn times for enemies

var meteorWaveTime : int = 2;
var enemyWave1Time : int = 8;
var enemyWave2Time : int = 14;
var enemyWave3Time : int = 20;
var enemyWave4Time : int = 26;
var enemyWave5Time : int = 30;
var healthPowerUpTime : int = 36;
var boss1Time : int = 42;

// ----------
// Initiate variables

var meteorFab : Transform;
var meteorSpawnTime : float;
var meteorsSpawned : int;

var enemy1Fab : Transform;
var enemy1SpawnTime : float;
var enemyWave1Spawned : int;

var enemy2Fab : Transform;
var enemy2SpawnTime : float;
var enemyWave2Spawned : int;

var enemy3Fab : Transform;
var enemy3SpawnTime : float;
var enemyWave3Spawned : int;

var enemy4Fab : Transform;
var enemy4SpawnTime : float;
var enemyWave4Spawned : int;

var enemy5Fab : Transform;
var enemy5SpawnTime : float;
var enemyWave5Spawned : int;

var healthPowerUp : Transform;
var healthPowerUpSpawnTime : float;
var healthPowerUpSpawned : int;

var boss1 : Transform;
var boss1SpawnTime : float;
var boss1Spawned : int;

// -----------

function Start () {

	meteorsSpawned = 0;
	meteorSpawnTime = Time.time + meteorWaveTime;

	enemyWave1Spawned = 0;
	enemy1SpawnTime = Time.time + enemyWave1Time;

	enemyWave2Spawned = 0;
	enemy2SpawnTime = Time.time + enemyWave2Time;

	enemyWave3Spawned = 0;
	enemy3SpawnTime = Time.time + enemyWave3Time;

	enemyWave4Spawned = 0;
	enemy4SpawnTime = Time.time + enemyWave4Time;

	enemyWave5Spawned = 0;
	enemy5SpawnTime = Time.time + enemyWave5Time;

	healthPowerUpSpawned = 0;
	healthPowerUpSpawnTime = Time.time + healthPowerUpTime;

	boss1Spawned = 0;
	boss1SpawnTime = Time.time + boss1Time;
}


// --------------------------------
// Helper functions

function meteorWave(nr : int){
	meteorsSpawned = 1;
	for(var i = 0; i < nr; i++){
		Instantiate(meteorFab, Vector2(Random.Range(Player_controls.Upperboundry_x, Player_controls.Lowerboundry_x),Player_controls.Upperboundry_y+1) , Quaternion.identity);
	}
}

// --

function enemy1Wave(nr : int){
	enemyWave1Spawned = 1;
	for(var i = 0; i < nr; i++){
		Instantiate(enemy1Fab, Vector2(Player_controls.Lowerboundry_x-2-i,Player_controls.Upperboundry_y+2*i), Quaternion.identity);
	}
}

// --

function enemy2Wave(nr : int){
	enemyWave2Spawned = 1;
	for(var i = 0; i < nr; i++){
		Instantiate(enemy2Fab, Vector2(Player_controls.Lowerboundry_x+i,Player_controls.Upperboundry_y+1), Quaternion.identity);
	}
}

// --

function enemy3Wave(nr : int){
	enemyWave3Spawned = 1;
	for(var i = 0; i < nr; i++){
		Instantiate(enemy1Fab, Vector2(Player_controls.Lowerboundry_x-i,Player_controls.Upperboundry_y+1+2*i), Quaternion.identity);
		Instantiate(enemy3Fab, Vector2(Player_controls.Upperboundry_x+i,Player_controls.Upperboundry_y+1+2*i), Quaternion.identity);
	}
}

// ---

function enemy4Wave(nr : int){
	enemyWave4Spawned = 1;
	for(var i = 0; i < nr; i++){
		Instantiate(enemy4Fab, Vector2(Player_controls.Lowerboundry_x+i,Player_controls.Upperboundry_y+1), Quaternion.identity);
	}
}

// ---

function enemy5Wave(nr : int){
	enemyWave5Spawned = 1;
	Instantiate(enemy5Fab, Vector2(0,Player_controls.Upperboundry_y), Quaternion.identity);
	for(var i = 1; i < nr; i++){
		Instantiate(enemy5Fab, Vector2(i*1.5,Player_controls.Upperboundry_y+i), Quaternion.identity);
		Instantiate(enemy5Fab, Vector2(-i*1.5,Player_controls.Upperboundry_y+i), Quaternion.identity);
	}
}

// ---

function boss1Wave(){
	boss1Spawned = 1;
	Instantiate(boss1, Vector2(0,Player_controls.Upperboundry_y), Quaternion.identity);
}

// ------

function healthPowerUpWave(){
	healthPowerUpSpawned = 1;
	Instantiate(healthPowerUp, Vector2(0,Player_controls.Upperboundry_y), Quaternion.identity);
}

//---------------------------------------------------
// ------ Main flow of level

function Update () {

	if(!meteorsSpawned && Time.time > meteorSpawnTime){
		meteorWave(8);
	}

	 if(!enemyWave1Spawned && Time.time > enemy1SpawnTime){
	 	enemy1Wave(4);
	 }

	if(!enemyWave2Spawned && Time.time > enemy2SpawnTime){
		enemy2Wave(3);
	}

	if(!enemyWave3Spawned && Time.time > enemy3SpawnTime){
		enemy3Wave(2);
	}

	if(!enemyWave4Spawned && Time.time > enemy4SpawnTime){
		enemy4Wave(1);
	}

	if(!enemyWave5Spawned && Time.time > enemy5SpawnTime){
		enemy5Wave(3);
	}

	if(!healthPowerUpSpawned && Time.time > healthPowerUpSpawnTime){
		healthPowerUpWave();
	}

	if(!boss1Spawned && Time.time > boss1SpawnTime){
		boss1Wave();
	}
}
