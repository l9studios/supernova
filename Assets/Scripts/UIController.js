﻿#pragma strict

var animator : Animator;
var sound: UI.Toggle;
var backgroundSoundTrack : AudioSource;
var deathSound : AudioSource;
var highscoreSound : AudioSource;

var player : PlayerController;
var background : BackgroundController;
var spawner : ObjectSpawnerController;
var ghost : GhostController;

function Start() {
	sound.isOn = PlayerPrefs.GetString("sound", "ON") == "ON";
	PlayBackgroundSoundTrack();
}

function Update () {	
	if (Input.GetKeyDown(KeyCode.Escape))
		Application.Quit(); 
		
	if(Input.GetMouseButtonDown(0)) {
		player.OnTouch();
		background.OnTouch();
		spawner.OnTouch();
		ghost.OnTouch();
	}
	
	if(player.isDead) {
		animator.SetTrigger("GameOver");
		return;
	}

	if(player.score > player.highscore) {
		animator.SetTrigger("HighScore");
		return;
	}
	
	if(player.isRunning) {
		animator.SetTrigger("Start");
		return;
	}
}		

function Play() {
	Application.LoadLevel("race");
}

function PlayBackgroundSoundTrack() {
	if(!sound.isOn)
		return;
	
	backgroundSoundTrack.Play();
}

function PlayDeathSound() {
	if(!sound.isOn)
		return;

	deathSound.Play();
	backgroundSoundTrack.Stop();
}

function PlayHighscoreSound() {
	if(!sound.isOn)
		return;
		
	highscoreSound.Play();
}

function ToggleSound() {
	
	PlayerPrefs.SetString("sound", sound.isOn ? "ON" : "OFF");
	
	if(!sound.isOn) {
		backgroundSoundTrack.Stop();
	} else {
		if(!player.isDead)
			backgroundSoundTrack.Play();
	}
	
}

function AdjustPitch() {
	backgroundSoundTrack.pitch = 1.0 + (player.Level() - 1) / 100.0;
}

