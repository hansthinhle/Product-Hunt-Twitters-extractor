if (chrome && chrome.tabs && chrome.tabs.query && typeof chrome.tabs.query === 'function') {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		var activeTab = tabs[0];
		chrome.tabs.executeScript(activeTab.id, {
		    file: "get-post-id.js",
		    allFrames: true
		}, function(results) {
			var postId = results[0];
			chrome.tabs.executeScript(activeTab.id, {
			    file: "get-voter-number.js",
			    allFrames: true
			}, function(results) {
				var voterNumber = results[0];
				var twitterList = [];
				var request;
				if (voterNumber && postId) {
					console.log('Getting twitters from ' + voterNumber + ' voters of the post ' + postId +' .....';
				    request = $.ajax({
				        url: 'https://www.producthunt.com/frontend/posts/' + postId + '/votes/?postId=' + postId + '&offset=0&limit=' + voterNumber,
				        method: 'GET'
				    }).done(function(voters) {
				    	if (voters && voters.length) {
				    		voters.map(function(voter) {
				    			return voter.twitter_username;
				    		});
				    		$('#twitter-list').html(twitterList.join(','));
				    	}
				    });
				    console.log(request);
				}
			});
		});
	});
}
