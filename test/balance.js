var keys = require('../keys.js');
var arete = require('arete');
var dwolla = require('dwolla-node')(keys.appKey, keys.appSecret);

// flag to false to test production API
dwolla.sandbox = keys.sandbox;
dwolla.setToken(keys.accessToken);

// TEST 1: 
// (TODO: we may want to implement a specific interval between requests)

describe('Balance', function() {
	it('1000 balance inquiries', function(done) {
		dwolla.setToken(keys.accessToken);

		arete.loadTest({
			name: 'balance-1000',
			requests: 1000,
			concurrentRequests: 100,
			targetFunction: function(callback) {
				dwolla.balance(callback);
			},
			printResponses: true,
			callback: done
		});

	});
});