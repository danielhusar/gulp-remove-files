'use strict';
var assert = require('assert');
var gutil = require('gulp-util');
var removeFiles = require('./index.js');
var fs = require('fs');

it('It should remove file', function (cb) {
  fs.writeFileSync(__dirname + '/foo.html', 'hello');
  assert(fs.existsSync(__dirname + '/foo.html'));

  var stream = removeFiles();
  stream.on('data', function(){});

  stream.on('end', function() {
    assert(!fs.existsSync(__dirname + '/foo.html'));
    cb();
  });

  stream.write(new gutil.File({
    base: __dirname,
    path: __dirname + '/foo.html',
    contents: new Buffer('')
  }));

  stream.end();
});
