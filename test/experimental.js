// experimental: can we do 1000 simultaneous requests?
// trying to maximize maxSockets, so we can truly send simultaneous requests...

var loadTest = require('./loadTest.js').loadTest;
var http = require('http');

var agent = new http.Agent();

agent.maxSockets = 50;

function getGoogle(cb) {
	http.get({
	  hostname: 'suggestqueries.google.com',
	  port: 80,
	  path: '/complete/search?client=chrome&q=foo',
	  agent: agent
	}, function(response) {
		var str = '';

	  //another chunk of data has been recieved, so append it to `str`
	  response.on('data', function (chunk) {
	    str += chunk;
	  });

	  //the whole response has been recieved, so we just print it out here
	  response.on('end', function () {
	    cb(null, str);
	  });
	});
}

getGoogle(console.log);

describe('Experimental', function() {
	it('Trying to see if inceasing maxSockets is faster', function(done) {
		loadTest('x-1000', 1000, function(callback) {
			getGoogle(callback);
		}, done);

	});
});