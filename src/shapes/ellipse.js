var c = require('./common');

function ellipseProxy(cx, cy, rx, ry, deg) {
  var points = [];

  deg = deg * Math.PI / 180;
  points.push({
    t: 'A',
    rx: rx,
    ry: ry,
    xar: deg,
    dx: cx - rx * Math.cos(deg),
    dy: cy - rx * Math.sin(deg)
  });
  points.push({
    t: 'A',
    rx: rx,
    ry: ry,
    xar: deg,
    dx: points[0].dx + 2 * rx * Math.cos(deg),
    dy: points[0].dy + 2 * rx * Math.sin(deg)
  });
  return points;
}

function convertEllipse(ellipses, context) {
  var len = ellipses.length, points;
  var cx, cy, rx, ry, deg = 0;
  var path, node;

  for (var n = 0; n < len; n++) {
    node = ellipses.item(n);
    cx = +node.getAttribute('cx');
    cy = +node.getAttribute('cy');
    rx = +node.getAttribute('rx');
    ry = +node.getAttribute('ry');

    path = context.createElementNS(c.namespace, 'path');
    points = ellipseProxy(cx, cy, rx, ry, deg);
    path.setAttribute('d', c.convertPointsToPath(points));
    node.parentNode.insertBefore(path, node);
  }
  while(ellipses.length > 0) {
    ellipses.item(0).parentNode.removeChild(ellipses.item(0));
  }
}