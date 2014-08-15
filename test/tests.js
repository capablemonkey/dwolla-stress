var _ = require('underscore');
var timer = require('exectimer');
var keys = require('../keys.js');
var dwolla = require('dwolla-node')(keys.appKey, keys.appSecret);

dwolla.sandbox = true;

// TEST 1: 
// (we may want to implement a specific interval between requests)
dwolla.setToken(keys.accessToken);

describe('Transactions / Send', function() {
	it('1000 Send requests in quick succession', function(done) {
		this.timeout(5000000);

		var sendResults = [];

		_.range(20).forEach(function(id) {
			// start timer
			var t = new timer.tick('send');
			t.start();
			// console.time(id);

			dwolla.send('9999', 'gordon@dwolla.com', 1.00, {destinationType: 'Email', notes: 'Thanks for the coffee!'}, function(err, data) {
		   	// end timer, print to console:
		   	t.stop();
		   	// console.timeEnd(id);

		   	// print out error, or transaction ID
		   	if (err) { 
		   		console.log(err); 
		   		sendResults.push({id: id, result: err});
		   	}
		   	else {
		   		console.log(data);
		   		sendResults.push({id: id, result: data});
		   	}

		   	if (sendResults.length == 20) {
		   	 // console.log('duration ', timer.timers.send.duration()); // total duration of all ticks
				 // console.log('min ', timer.timers.send.min()); // minimal tick duration
				 // console.log('max ', timer.timers.send.max()); // maximal tick duration
				 // console.log('mean ', timer.timers.send.mean()); // mean tick duration
				 // console.log('median ',timer.timers.send.median()); // median tick duration
		   		done();
		   	}
			});
		});

	});
});

// var sendResults = [];

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

