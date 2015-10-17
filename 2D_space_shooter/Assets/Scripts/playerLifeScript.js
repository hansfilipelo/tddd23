#pragma strict
var LifeSprite : Transform;
var distanceBetweenSprite : float=0.5;

function Awake(){
	DontDestroyOnLoad (this.gameObject);
}

function Start () {
	 Instantiate(this.LifeSprite, Vector2(0.15,0.1+distanceBetweenSprite*1), Quaternion.identity);
	//for(var i=0; i<3; i++){
		Instantiate(this.LifeSprite, Vector2(0.15,0.1+distanceBetweenSprite*1), Quaternion.identity);
	//}
}

function Update () {

}