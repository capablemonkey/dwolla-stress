var _ = require('underscore');
var execTime = require('exec-time');
var keys = require('../keys.js');
var dwolla = require('dwolla-node')(keys.appKey, keys.appSecret);

dwolla.sandbox = true;

function loadTest(testName, numIterations, targetFn, callback) {
	var results = [];

	// start timer
	var profiler = new execTime('send');
	profiler.beginProfiling();
	profiler.step('Starting to make requests');

	_.range(numIterations).forEach(function(id) {
		profiler.step('Sending request #' + id);

		targetFn(function(err, data) {
			// save time since last response before 'stepping' so that
			// we can include it in results later. 
			// TODO: figure out - does this operation significantly impact accuracy of time logged?
			var timeSinceLastResponse = profiler.elapsedSinceLastStep();
	   	profiler.step('Received response for request #' + id);

	   	// log result:
   		results.push({
   			requestId: id, 
   			success: err ? false : true,
   			response: err || data, 
   			timeSinceBeginning: profiler.elapsedSinceBeginning(),
   			timeSinceLastResponse: timeSinceLastResponse
   		});

   		// print out error, or response
   		console.log(err || data);

	   	if (results.length == numIterations) {
	   		// console.log("Response log:", results);

	   		var longestResponseTime = _.max(results, function(result){ return result.timeSinceLastResponse;});
	   		var shortestResponseTime = _.min(results, function(result){ return result.timeSinceLastResponse;});
	   		var totalResponseTime = _.reduce(results, function(prev, curr){ return prev + curr.timeSinceLastResponse; }, 0);
	   		var successfulResponses = _.where(results, {success: true});

	   		console.log(" === LOOK MA', STATS! ===");
	   		console.log('Number of requests: ', results.length);
	   		console.log('Successful responses: ', successfulResponses.length);
	   		console.log('% success: ', (successfulResponses.length / results.length * 100).toFixed(2));
	   		console.log('Longest response time: ', longestResponseTime.timeSinceLastResponse, 'ms');
	   		console.log('Shortest response time: ', shortestResponseTime.timeSinceLastResponse, 'ms');
	   		console.log('Average response time: ', totalResponseTime / results.length, 'ms');
	   		callback();
	   	}
		});
	});

	profiler.step('All requests fired off');
}

// TEST 1: 
// (we may want to implement a specific interval between requests)
describe('Transactions / Send', function() {
	it('1000 Send requests in quick succession', function(done) {
		// override mocha's default timeout of 2000 ms.
		this.timeout(5000000);

		dwolla.setToken(keys.accessToken);

		loadTest('send-1000', 20, function(callback) {
			dwolla.send('9999', 'gordon@dwolla.com', 1.00, {destinationType: 'Email', notes: 'Thanks for the coffee!'}, callback);
		}, done);

	});
});

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

