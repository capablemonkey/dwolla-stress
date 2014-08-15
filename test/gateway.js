var keys = require('../keys.js');
var dwolla = require('dwolla-node')(keys.appKey, keys.appSecret);
var loadTest = require('./loadTest.js');

// flag to false to test production API
dwolla.sandbox = keys.sandbox;
dwolla.setToken(keys.accessToken);

describe('Gateway', function() {
	it('1000 Checkout requests in quick succession', function(done) {
		loadTest('gateway-1000', 20, function(callback) {

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