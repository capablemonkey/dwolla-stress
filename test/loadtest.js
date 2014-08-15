var _ = require('underscore');
var execTime = require('exec-time');
var util = require('util');

module.exports = function(testName, numIterations, targetFn, callback) {
	var results = [];

	// start timer
	var profiler = new execTime(testName);
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

	   		var longestResponseTimeInterval = _.max(results, function(result){ return result.timeSinceLastResponse;});
	   		var shortestResponseTimeInterval = _.min(results, function(result){ return result.timeSinceLastResponse;});
	   		var totalResponseTimeInterval = _.reduce(results, function(prev, curr){ return prev + curr.timeSinceLastResponse; }, 0);
	   		var successfulResponses = _.where(results, {success: true});

	   		var shortestResponseTime = _.min(results, function(result){ return result.timeSinceBeginning;});
	   		var longestResponseTime =  _.max(results, function(result){ return result.timeSinceBeginning;});
	   		var totalResponseTime = _.reduce(results, function(prev, curr){ return prev + curr.timeSinceBeginning; }, 0);

	   		console.log(" === LOOK MA', STATS! ===");
	   		console.log(util.format('%s requests fired, of which we got back %s successful responses (%s% success rate)', 
	   			results.length,
	   			successfulResponses.length,
	   			(successfulResponses.length / results.length * 100).toFixed(2)
	   		));
	   		console.log(' ');
	   		console.log('Longest time between responses: ', longestResponseTimeInterval.timeSinceLastResponse, 'ms');
	   		console.log('Shortest time between responses: ', shortestResponseTimeInterval.timeSinceLastResponse, 'ms');
	   		console.log('Average response time interval: ', totalResponseTimeInterval / results.length, 'ms');
	   		console.log(' ');
	   		console.log('Shortest response time: ', shortestResponseTime.timeSinceBeginning, 'ms');
	   		console.log('Longest response time: ', longestResponseTime.timeSinceBeginning, 'ms');
	   		console.log('Average response time: ', totalResponseTime / results.length, 'ms');
	   		
	   		callback();
	   	}
		});
	});

	profiler.step('All requests fired off');
};