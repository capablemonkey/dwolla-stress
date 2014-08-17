var benchrest = require('bench-rest');
//var flow = 'https://uat.dwolla.com/oauth/rest/users/gordon@dwolla.com?client_id=JCGQXLrlfuOqdUYdTcLz3rBiCZQDRvdWIUPkw%2B%2BGMuGhkem9Bo&client_secret=g7QLwvO37aN2HoKx1amekWi8a2g7AIuPbD5C%2FJSLqXIcDOxfTr';  // can use as simple single GET
var flow = 'https://uat.dwolla.com/oauth/rest/balance/?oauth_token=S1yDn0kfooVoINADOwplpDKsGS14chJ6b5SgRqDwANptCgq4gx'
// if the above flow will be used with the command line runner or
// programmatically from a separate file then export it.
module.exports = flow;

// There are even more flow options like setup and teardown, see detailed usage

var runOptions = {
  limit: 1000,     // concurrent connections
  iterations: 5000,  // number of iterations to perform
  progress: 500
};
benchrest(flow, runOptions)
  .on('error', function (err, ctxName) { console.error('Failed in %s with err: ', ctxName, err); })
  .on('progress', function (stats, percent, concurrent, ips) {
    console.log('Progress: %s% complete, %s concurrent connections, %s rqs per second', percent, concurrent, ips);
  })
  .on('end', function (stats, errorCount) {
    console.log('error count: ', errorCount);
    console.log('stats', stats);
  });