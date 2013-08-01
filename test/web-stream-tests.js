var should = require('should');
var WebStream = require('..');
var SourceStream = require('./sourceStream');
var AssertionStream = require('./sourceStream');

describe('#ctor', function() {
  describe('options argument', function() {
    it('can be omitted', function() {
      should.exist(new WebStream(), 'should allow zero argument constructor');
    });
    describe('attributes', function() {
      it('can specify a maximum backoff time', function() {
        var arg = {
          maxBackoff : 1000
        };
        new WebStream(arg).should.have.property('maxBackoff', 1000);
      });
      it('can specify a retry strategy', function() {
        var arg = {
          shouldRetry : function(err, res, body) { return !!err; }
        };
        new WebStream(arg).shouldRetry.should.be.an.instanceOf(Function);
      });
    });
  });
});

describe('input object', function() {
  it.skip('specifies a url attribute', function() {
    var source = new SourceStream(['good', 'good', 'bad']);
    var webStream = new WebStream();
    source
      .pipe(webStream)
      .pipe(assertonStream);
  });
});

describe('output object', function() {
  it.skip('specifies a response', function() {
  });
});
