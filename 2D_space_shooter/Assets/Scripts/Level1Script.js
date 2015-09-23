﻿#pragma strict

var meteorFab : Transform;
var meteorSpawn : float;
var meteorSpawnTime : float;
var meteorsSpawned : float;

var enemy1Fab : Transform;
var enemy1SpawnTime : float;
var enemyWave1Time : float;
var enemyWave1Spawned : float;

function Start () {
	
	// Set up scenes outer edges
	Gizmos.color = Color.white;
	//var width = 1;
	var bottomLeft = Vector2(Player_controls.Lowerboundry_x, Player_controls.Lowerboundry_y);
	var topLeft = Vector2(Player_controls.Lowerboundry_x, Player_controls.Upperboundry_y);
	Debug.DrawLine(bottomLeft, topLeft);
	
	meteorsSpawned = 0;
	meteorSpawnTime = Time.time + meteorSpawn;
	enemy1SpawnTime = Time.time + enemyWave1Time;
}


// --
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
		Instantiate(enemy1Fab, Vector2(Player_controls.Lowerboundry_x-i,Player_controls.Upperboundry_y+1+2*i), Quaternion.identity);
	}
}

// --


//--

function Update () {
	
	if(!meteorsSpawned && Time.time > meteorSpawnTime){
		meteorWave(4);
	}
	
	if(!enemyWave1Spawned && Time.time > enemy1SpawnTime){
		enemy1Wave(4);
	}
}