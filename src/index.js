var xml = require('xmldom');
var fs = require('fs');
var Q = require('q');
var Parser = xml.DOMParser;
var Serializer = xml.XMLSerializer;
var shapes2path = require('./shapes');
var crush = require('./crush');

function SC(source) {
  this.basicShapes = ['rect', 'circle', 'ellipse', 'line', 'polyline', 'polygon'];
  this.source = source;
  this.docQ = this._parse(source);
}

SC.prototype._parse = function() {
  var basicShapes = this.basicShapes;

  return Q
    .nfcall(fs.readFile, this.source, 'utf8')
    .then(function(data) {
      var doc = new Parser().parseFromString(data, 'text/xml');
      var svg = doc.getElementsByTagName('svg')[0];
      var shapes = {}, xml;

      basicShapes.forEach(function(shape) {
        shapes[shape] = svg.getElementsByTagName(shape);
      });

      Object.keys(shapes).forEach(function(shape) {
        // TODO: 统一处理transform的情况
        if (shapes[shape].length) {
          shapes2path[shape](shapes[shape], doc);
        }
      });
      // TODO: remove empty node
      // TODO: remove comment
      // TODO: remove group
      // TODO: merge path
      // TODO: 处理svg尺寸的情况
      crush.mergePaths(svg);

      return doc;
    });
};

SC.prototype.getDocQ = function() {
  return this.docQ;
};

SC.prototype.getPathQ = function() {
  return this.docQ
    .then(function(doc) {
      var path = doc.getElementsByTagName('path');
      return path.item(0).getAttribute('d');
    });
};

SC.prototype.crush = function(dest) {
  return this.docQ
    .then(function(doc) {
      var xml = new Serializer().serializeToString(doc);
      return Q.nfcall(fs.writeFile, dest, xml, 'utf8');
    });
};

module.exports = SC;