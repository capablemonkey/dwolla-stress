# dwolla-stress

Stress testing Dwolla's API.  Let's see what happens when we try to make 1000 API calls (nearly) simultaneously.

## Get started
Clone the project.  Install depedencies:

`npm install`

Install mocha:

`npm install -g mocha`

Put your API credentials into `keys.js` and run tests:

`mocha`

## Method of action

All the desired requests are made asynchronously and, in practice, are sent not quite simultaneously (seem to be within <=1 ms between each other), but pretty quick.

```
accountinfo-1000 - Begin profiling
accountinfo-1000 - Starting to make requests - 0ms (total: 0ms)
accountinfo-1000 - Sending request #0 - 0ms (total: 1ms)
accountinfo-1000 - Sending request #1 - 17ms (total: 18ms)
accountinfo-1000 - Sending request #2 - 2ms (total: 20ms)
accountinfo-1000 - Sending request #3 - 1ms (total: 21ms)
accountinfo-1000 - Sending request #4 - 1ms (total: 22ms)
accountinfo-1000 - Sending request #5 - 0ms (total: 22ms)
accountinfo-1000 - Sending request #6 - 1ms (total: 23ms)
accountinfo-1000 - Sending request #7 - 0ms (total: 23ms)
accountinfo-1000 - Sending request #8 - 0ms (total: 23ms)
accountinfo-1000 - Sending request #9 - 0ms (total: 23ms)
accountinfo-1000 - Sending request #10 - 0ms (total: 23ms)
```

As the responses come in, we note the time since the last response, the total elapsed time so far, and the response body:

```
accountinfo-1000 - Received response for request #0 - 493ms (total: 520ms)
{ Id: '812-742-3301',
  Name: 'Gordon Zheng',
  Latitude: 0,
  Longitude: 0 }
accountinfo-1000 - Received response for request #2 - 27ms (total: 547ms)
{ Id: '812-742-3301',
  Name: 'Gordon Zheng',
  Latitude: 0,
  Longitude: 0 }
accountinfo-1000 - Received response for request #1 - 9ms (total: 557ms)
{ Id: '812-742-3301',
  Name: 'Gordon Zheng',
  Latitude: 0,
  Longitude: 0 }
```

Notice that the responses won't necessarily come in the order which they were sent.

When all the responses have arrived, we spit out a report:

```
 === LOOK MA', STATS! ===
20 requests fired, of which we got back 20 successful responses (100.00% success rate)

Longest time between responses:  493 ms
Shortest time between responses:  2 ms
Average response time interval:  48.05 ms

Shortest response time:  991 ms
Longest response time:  520 ms
Average response time:  750.8 ms
```

## Writing tests

Writing tests is easy.  We use the [mocha](http://visionmedia.github.io/mocha/) framework for testing.  

The `loadTest` function wraps the load testing functionality.  So, all you need to do is create a new test in `test/tests.js`where you call loadTest, passing in a name for the test, number of times to make the API call, a bounded function containing the API call you want to make, and mocha's `done()` function as a callback.

```
describe('Account Info', function() {
	it('1000 Account Info lookup requests in quick succession', function(done) {
		loadTest('test name', 1000, function(callback) {
			dwolla.basicAccountInfo('gordon@dwolla.com', callback);
		}, done);
	});
});
```