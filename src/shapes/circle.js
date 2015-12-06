var c = require('./common');

/**
 * 获取圆形路径点
 * @param cx 圆心x坐标
 * @param cy 圆心y坐标
 * @param r 圆半径
 * @returns {Array}
 */
function circleProxy(cx, cy, r) {
  var points = [];

  points.push({
    t: 'A',
    rx: r,
    ry: r,
    rax: 0,
    dx: cx + r,
    dy: cy
  });

  points.push({
    t: 'A',
    rx: r,
    ry: r,
    rax: 0,
    dx: cx - r,
    dy: cy
  });

  return points;
}

exports.circle = function(circles, context) {
  var len = circles.length, points;
  var cx, cy, r;
  var path, node;

  for (var n = 0; n < len; n++) {
    node = circles.item(n);
    cx = +node.getAttribute('cx');
    cy = +node.getAttribute('cy');
    r = +node.getAttribute('r');

    points = circleProxy(cx, cy, r);
    path = context.createElementNS(c.namespace, 'path');
    path.setAttribute('d', c.convertPointsToPath(points));
    node.parentNode.insertBefore(path, node);
  }
};