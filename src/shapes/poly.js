var c = require('./common');

function polyProxy(p) {
  p = p.split(/\s|,/);
  var len = p.length, points = [];

  for (var n = 0; n < len; n += 2) {
    points.push({
      t: n == 0 ? 'M' : 'L',
      x: +p[n], y: +p[n + 1]
    });
  }

  return points;
}

function poly(unclose) {
  return function(polys, context) {
    var len = polys.length, points;

    for (var n = 0; n < len; n++) {
      var node = polys.item(n);

      points = polyProxy(node.getAttribute('points'));
      c.convertNodeToPath(points, node, context, unclose);
    }
  }
}

exports.polygon = poly();
exports.polyline = poly(true);