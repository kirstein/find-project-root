var fs     = require('fs');
var assert = require('assert');
var path   = require('path');

function markerExists (files) {
  var markers = module.exports.ROOT_MARKERS;
  return markers.some(function(marker) {
    return files.some(function (file) {
      return file === marker;
    });
  });
}

function findRoot (directory, runs) {
  assert(directory, "Directory not defined");
  var files = fs.readdirSync(directory);
  if (runs >= module.exports.MAX_LEVELS) {
    return null;
  } else if (markerExists(files)) {
    return directory;
  } else {
    return findRoot(path.resolve(directory, '..'), runs + 1);
  }
}

module.exports = function(dir) { return findRoot(dir, 0); };
module.exports.MAX_LEVELS = 3;
module.exports.ROOT_MARKERS = [ '.git' ];
