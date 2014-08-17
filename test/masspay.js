var keys = require('../keys.js');
var arete = require('arete');
var dwolla = require('dwolla-node')(keys.appKey, keys.appSecret);
var _ = require('underscore');

// flag to false to test production API
dwolla.sandbox = keys.sandbox;
dwolla.setToken(keys.accessToken);

// TEST 1: 
// (TODO: we may want to implement a specific interval between requests)

describe('MassPay / Create', function() {
	it('1000 MassPay jobs with 10,000 items each in quick succession', function(done) {
		dwolla.setToken(keys.accessToken);

		var items = [];

		var item = {
			amount: 0.01,
			destination: 'a@example.com',
			destinationType: 'Email',
			notes: 'for your good work',
			metadata: {
				'arbitrary_info': 'the house tasted good'
			}
		}
		
		_.range(10000).forEach(function() {items.push(item);})

		arete.loadTest({
			name: 'masspay-1000',
			requests: 1000,
			concurrentRequests: 100,
			targetFunction: function(callback) {
				dwolla.createMassPayJob('Balance', '9999', items, {
					userJobId: 'do you like stress',
					assumeCosts: true 		// sender will assume Dwolla transaction fees for each payment
				}, callback);
			},
			printResponses: false,
			callback: done
		});

	});
});