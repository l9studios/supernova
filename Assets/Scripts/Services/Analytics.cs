using UnityEngine;
using System.Collections;

namespace Supernova {

	public class Analytics : MonoBehaviour {

		public void Death(int score, string by) {
			#if UNITY_ANALYTICS
				Debug.Log ("Death Analytics :: score: " + score + ", by: " + by);
				
				UnityEngine.Analytics.CustomEvent("death", new Dictionary<string, object>
				{
					{ "score", score },
					{ "by", by }
				}); 
			#endif
		}

	}

}