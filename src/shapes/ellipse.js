var c = require('./common');

function ellipseProxy(cx, cy, rx, ry, deg) {
  var points = [];
  deg = deg * Math.PI / 180;
  var x = cx - rx * Math.cos(deg);
  var y = cy - rx * Math.sin(deg)

  points.push({
    t: 'M',
    x: x,
    y: y
  });

  points.push({
    t: 'A',
    rx: rx,
    ry: ry,
    xar: deg,
    dx: x,
    dy: y
  });

  points.push({
    t: 'A',
    rx: rx,
    ry: ry,
    xar: deg,
    dx: x + 2 * rx * Math.cos(deg),
    dy: y + 2 * rx * Math.sin(deg)
  });
  return points;
}

module.exports = function(ellipses, context) {
  var len = ellipses.length, points;
  var cx, cy, rx, ry, deg = 0, node;

  for (var n = 0; n < len; n++) {
    node = ellipses.item(n);
    cx = +node.getAttribute('cx');
    cy = +node.getAttribute('cy');
    rx = +node.getAttribute('rx');
    ry = +node.getAttribute('ry');

    points = ellipseProxy(cx, cy, rx, ry, deg);
    c.convertNodeToPath(points, node, context);
  }
};