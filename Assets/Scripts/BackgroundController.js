﻿
#pragma strict

var player : PlayerController;
var totalOffset : float;
var step : float;
var counter : float;
var idleStep : float;
var materials : Material[];

function Start () {
	var meshRenderer : MeshRenderer = GetComponent(MeshRenderer);
	meshRenderer.material = materials[Random.Range(0, materials.Length)];
}

function Update () {
	if(!player.isRunning)
		return;
		
	RollBackground(idleStep * Time.deltaTime);
	
	if( counter > 0 ) {
		RollBackground(step);
		counter -= step;
	} else {
		if(player.CanMove()) {
			counter = totalOffset;
		}
	}
	
}

function RollBackground(rollStep : float) {
	var mat = renderer.material;
	var offset = mat.mainTextureOffset;
	offset.y += rollStep;
	mat.mainTextureOffset = offset;
}