var keys = require('../keys.js');
var arete = require('arete');
var dwolla = require('dwolla-node')(keys.appKey, keys.appSecret);

// flag to false to test production API
dwolla.sandbox = keys.sandbox;
dwolla.setToken(keys.accessToken);

describe('Account Info', function() {
	it('1000 Account Info requests in quick succession', function(done) {
		
		arete.loadTest({
			name: 'accountinfo-1000',
			requests: 1000,
			concurrentRequests: 100,
			targetFunction: function(callback) {
				dwolla.basicAccountInfo('gordon@dwolla.com', callback);
			},
			showResponses: false,
			callback: done
		});

	});
});