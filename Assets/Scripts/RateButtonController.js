﻿#pragma strict

function Start () {
	this.active = PlayerPrefs.GetInt("ShowRate", 1) == 1;
}

function Rate() {
	Application.OpenURL("market://details?id=com.cosmicgardenlabs.supernova");
	PlayerPrefs.SetInt("ShowRate", 0);
	this.active = false;
}

