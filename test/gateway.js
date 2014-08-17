var keys = require('../keys.js');
var arete = require('arete');
var dwolla = require('dwolla-node')(keys.appKey, keys.appSecret);

// flag to false to test production API
dwolla.sandbox = keys.sandbox;
dwolla.setToken(keys.accessToken);

describe('Gateway', function() {
	it('1000 Checkout requests in quick succession', function(done) {
		arete.loadTest({
			name:'gateway-1000', 
			requests: 1000, 
			concurrentRequests: 100,
			targetFunction: function(callback) {

				dwolla.createCheckout('http://google.com', {
					destinationId: '812-740-4294',
	     		total: '5.00'
				}, {
	     		allowFundingSources: true,
	     		orderId: 'blah',
	    	}, callback);

			},
			printResponses: false,
			callback: done
		});
	});
});