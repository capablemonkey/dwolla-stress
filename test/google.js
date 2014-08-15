// Try 1000 requests against google autocomplete, for comparison:

var loadTest = require('./loadTest.js');
var autocomplete = require('google-autocomplete');

describe('Google Autocomplete', function() {
	it('1000 queries to Google autocomplete', function(done) {

		loadTest('send-1000', 1000, function(callback) {
			autocomplete.getQuerySuggestions('foo', callback);
		}, done);

	});
});