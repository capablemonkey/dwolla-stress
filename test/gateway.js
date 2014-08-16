var keys = require('../keys.js');
var loadTest = require('./loadTest.js').loadTest;
var dwolla = require('dwolla-node')(keys.appKey, keys.appSecret);

// flag to false to test production API
dwolla.sandbox = keys.sandbox;
dwolla.setToken(keys.accessToken);

describe('Gateway', function() {
	it('1000 Checkout requests in quick succession', function(done) {
		loadTest('gateway-1000', 1000, function(callback) {

			dwolla.createCheckout('http://google.com', {
				destinationId: '812-740-4294',
     		total: '5.00'
			}, {
     		allowFundingSources: true,
     		orderId: 'blah',
    	}, callback);

		}, done);
	});
});