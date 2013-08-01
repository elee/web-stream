var Readable = require('readable-stream').Readable;

var SourceStream = function(arg) {
  this.elements = Array.isArray(arg) ? arg.reverse() : [];
  Readable.call(this, {objectMode : true});
};

SourceStream._read = function(arg) {
  // 'or null' may be unnecessary but we'll obey the convention
  this.push(arg.pop() || null);
};

module.exports = SourceStream;
