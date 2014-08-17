var keys = require('../keys.js');
var arete = require('arete');
var dwolla = require('dwolla-node')(keys.appKey, keys.appSecret);
var assert = require('assert');

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
			printResponses: false,
			callback: function(err, report) {
				if (err) return done(err);

				assert.equal(report.successfulResponses.length, report.results.length, "We didn't get all successful responses!");
        assert(report.averageResponseTimeInterval < 100, "Time between responses is way too long!");
        assert(report.timeElapsed < 30e3, "Unacceptable amount of time for 1000 requests to complete: 30 seconds");
        done();
			}
		});

	});
});