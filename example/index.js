var WebStream = require('..');
var Readable = require('readable-stream').Readable;
var options = {
  maxBackoff : seconds(11),
  // user defined function as to whether to retry
  shouldRetry : function(err, res, body) {
    if (res.statusCode === 404 || err) {
      console.log('should retry?', true);
      return true;
    }
    console.log('non-404 should retry?', !!err);
    return !!err;
  }
};

var webStream = new WebStream(options);
var subStream = new Readable({objectMode : true});
var c = 0;
subStream._read = function() {
  if (c++ > 10)
    this.push({
      url : 'http://www.google.com/notthere',
      method : 'GET'
    });
  else
    this.push(makeGet());
};

// pipe the kafka stream to the stringifier to standard out
subStream
  .pipe(webStream)
  .pipe(process.stdout);

function seconds(arg) {
  return 1000 * arg;
}
function makeGet() {
  return {
    url : 'http://rapgenius.com/',
    method : 'GET'
  };
}
