var keys = require('../keys.js');
var loadTest = require('./loadTest.js').loadTest;
var dwolla = require('dwolla-node')(keys.appKey, keys.appSecret);

// flag to false to test production API
dwolla.sandbox = keys.sandbox;
dwolla.setToken(keys.accessToken);

describe('Account Info', function() {
	it('1000 Account Info requests in quick succession', function(done) {
		loadTest('accountinfo-1000', 1000, function(callback) {
			dwolla.basicAccountInfo('gordon@dwolla.com', callback);
		}, done);
	});
});