using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using UnityEngine.Analytics;

public class Services : MonoBehaviour {

	bool authenticated;

	public void Death(int score, string by) {
		Debug.Log ("Death Analytics :: score: " + score + ", by: " + by);

		Analytics.CustomEvent("death", new Dictionary<string, object>
		{
			{ "score", score },
			{ "by", by }
		}); 
	}

	public void Authenticate() {
		Social.localUser.Authenticate(success => {
			authenticated = success;
			if (success) {
				Debug.Log ("Authentication successful");
				string userInfo = "Username: " + Social.localUser.userName + 
					"\nUser ID: " + Social.localUser.id + 
					"\nIsUnderage: " + Social.localUser.underage;
				Debug.Log (userInfo);
			}
			else {
				Debug.LogWarning ("Authentication failed");
			}
		});
	}

	public void ReportScore(int score) {
		if(authenticated) 
			Social.ReportScore(score, GooglePlayConstants.leaderboard_best_starters, success => {});
		else
			Debug.LogWarning("Can't report score because it's not authenticated");
	}

}

