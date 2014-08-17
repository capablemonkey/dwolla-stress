// Try 1000 requests against google autocomplete, for comparison:

var arete = require('arete');
var autocomplete = require('google-autocomplete');

describe('Google Autocomplete', function() {
	it('1000 queries to Google autocomplete', function(done) {

		arete.loadTest({
			name: 'google-1000',
			requests: 1000,
			concurrentRequests: 100,
			targetFunction: function(callback) {
				autocomplete.getQuerySuggestions('foo', callback);
			},
			printResponses: false,
			callback: done
		});

	});
});