var c = require('./common');

function lineProxy(x1, y1, x2, y2) {
  var points = [];

  points.push({
    t: 'M',
    x: x1,
    y: y1
  });

  points.push({
    t: 'L',
    x: x2,
    y: y2
  });
}

module.exports = function(lines, context) {
  var len = lines.length, points;
  var x1, y1, x2, y2, node;

  for (var n = 0; n < len; n++) {
    node = lines.item(n);
    x1 = +node.getAttribute('x1');
    y1 = +node.getAttribute('y1');
    x2 = +node.getAttribute('x2');
    y2 = +node.getAttribute('y2');

    points = lineProxy(x1, y1, x2, y2);
    c.convertNodeToPath(points, node, context, true);
  }
};