function polyProxy(points) {
  return points.split(',').map(function(point, i) {
    var reg = /^\s*(\d+)\s*(\d+)\s*$/;
    var p = point.match(reg) || [0, 0, 0];

    return {
      t: i == 0 ? 'M' : 'L',
      x: p[1], y: p[2]
    };
  });
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