var c = require('./common');

/**
 * 获取矩形的path路径点
 * @param x 矩形左上角的x位置
 * @param y 矩形左上角的y位置
 * @param w 矩形的宽度
 * @param h 矩形的高度
 * @returns {Array} 路径点数组
 */
function rectProxy(x, y, w, h) {
  var points = [];

  points.push({
    t: 'M',
    x: x,
    y: y
  });
  points.push({
    t: 'L',
    x: x + w,
    y: y
  });
  points.push({
    t: 'L',
    x: x + w,
    y: y + h
  });
  points.push({
    t: 'L',
    x: x,
    y: y + h
  });
  return points;
}

module.exports = function(rects, context) {
  var len = rects.length, points;
  var x, y, w, h, node;

  for (var n = 0; n < len; n++) {
    node = rects.item(n);
    x = +node.getAttribute('x');
    y = +node.getAttribute('y');
    w = +node.getAttribute('width');
    h = +node.getAttribute('height');

    points = rectProxy(x, y, w, h);
    c.convertNodeToPath(points, node, context);
  }
};