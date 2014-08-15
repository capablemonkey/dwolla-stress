var _ = require('underscore');
var execTime = require('exec-time');
var keys = require('../keys.js');
var dwolla = require('dwolla-node')(keys.appKey, keys.appSecret);

dwolla.sandbox = true;

function LoadTest(testName, numIterations, targetFn, callback) {
	var results = [];

	// start timer
	var profiler = new execTime('send');
	profiler.beginProfiling();
	profiler.step('Starting to make requests');

	_.range(numIterations).forEach(function(id) {
		profiler.step('Sending request #' + id);

		targetFn(function(err, data) {
	   	profiler.step('Received response for request #' + id);

	   	// print out error, or transaction ID
   		console.log(data || err);
   		results.push({requestId: id, response: data || err, timeSinceBeginning: profiler.elapsedSinceBeginning()});

	   	if (results.length == numIterations) {
	   		console.log("Response log:", results);
	   		callback();
	   	}
		});
	});

	profiler.step('All requests fired off');
}

// TEST 1: 
// (we may want to implement a specific interval between requests)
dwolla.setToken(keys.accessToken);

describe('Transactions / Send', function() {
	it('1000 Send requests in quick succession', function(done) {
		// override mocha's default timeout of 2000 ms.
		this.timeout(5000000);

		LoadTest('send-1000', 20, function(callback) {
			dwolla.send('9999', 'gordon@dwolla.com', 1.00, {destinationType: 'Email', notes: 'Thanks for the coffee!'}, callback);
		}, done);

	});
});

// var results = [];

// _.range(1000).forEach(function(id) {
// 	// start timer
// 	console.time(id);

// 	dwolla.send('9999', 'gordon@dwolla.com', 1.00, {destinationType: 'Email', notes: 'Thanks for the coffee!'}, function(err, data) {
//    	// end timer, print to console:
//    	console.timeEnd(id);

//    	// print out error, or transaction ID
//    	if (err) { console.log(err); }
//    	else console.log(data);
// 	});
// });

// TEST 2: 1000 Gateway Checkout requests in quick succession

// TEST 3: 1000 Transaction Listing requests (of 200 records each) in quick succession

// TEST 4: 1000 MassPay jobs each with 100 items in quick succession

// TEST 5: 1000 AccountInfoFull lookups in quick succession

// TEST 6: 1000 AccountInfo lookups in quick succession

// TEST 7: 1000 Requests created in quick succession

// TEST 8: 1000 requests fulfilled in quick succession

// TEST 9: 1000 Balance retrievals in quick succession

// TEST 10: 1000 Contacts listing in quick succession

// TEST 11: 1000 Toggle Autowithdrawal calls in quick succession

// TEST 12: 1000 TransactionStats calls in quick succession

// TEST 13: 1000 Spots calls in quick succession

// TEST 14: 1000 MassPay Items listing calls in quick succession

