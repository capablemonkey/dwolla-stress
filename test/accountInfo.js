var keys = require('../keys.js');
var dwolla = require('dwolla-node')(keys.appKey, keys.appSecret);
var loadTest = require('./loadTest.js');

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