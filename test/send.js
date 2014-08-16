var keys = require('../keys.js');
var dwolla = require('dwolla-node')(keys.appKey, keys.appSecret);
var loadTest = require('./loadTest.js').loadTest;

// flag to false to test production API
dwolla.sandbox = keys.sandbox;
dwolla.setToken(keys.accessToken);

// TEST 1: 
// (TODO: we may want to implement a specific interval between requests)

describe('Transactions / Send', function() {
	it('1000 Send requests in quick succession', function(done) {
		dwolla.setToken(keys.accessToken);

		loadTest('send-1000', 1000, function(callback) {
			dwolla.send('9999', 'n@dwolla.com', 0.33, {destinationType: 'Email', notes: 'Thanks for the coffee!'}, callback);
		}, done);

	});
});