var util = require('util'),
Parent = require('readable-stream').Transform,
request = require('request');

var WebStream = function(options) {
  options = options || {};
  this.shouldRetry = options.shouldRetry || function(err, res, body) {
    return false;
  };
  if (options.maxBackoff)
    this.maxBackoff = options.maxBackoff;
  Parent.call(this, {objectMode : true});
};

util.inherits(WebStream, Parent);

WebStream.prototype._transform = function(chunk, encoding, callback) {
  foo(this, chunk, callback, 0);
};

var foo = function(stream, chunk, callback, attempt) {
  // chunk is: url,method[,headers[,body]]
  request(chunk, function(err, res, body) {
    if(!stream.shouldRetry(err, res, body)) {
      stream.push(
        JSON.stringify({error: err, response: res.statusCode}) + '\n'
      );
      return callback(false);
    }
    // retry with backoff
    stream.push(JSON.stringify({error: err, response: res.statusCode}));
    ++attempt;
    setTimeout(function() {
      foo(stream, chunk, callback, attempt);
    }, delayFor(attempt, stream.maxBackoff));
  });
};

function delayFor(attempt, maxDelay) {
  var result = 1000 * Math.pow(attempt, 2);
  if (maxDelay)
    result = Math.min(result, maxDelay);
  return result;
}

module.exports = WebStream;
