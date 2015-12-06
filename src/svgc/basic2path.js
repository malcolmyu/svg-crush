/**
 * Converts all basic shapes to path, and merge all paths.
 * @see http://www.w3.org/TR/SVG/shapes.html
 */
var fs = require('fs');
var Q = require('q');
var parser = require('./parser.js');

var def = Q.nfcall(fs.readFile, '/Users/malcolm/Git/my/svg_crush/test/test.svg', {encoding: 'utf8'});

def.then(data => {
  parser(data);
});