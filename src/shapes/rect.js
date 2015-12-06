var c = require('./common');

/**
 * 获取矩形的path路径点
 * @param x 矩形左上角的x位置
 * @param y 矩形左上角的y位置
 * @param w 矩形的宽度
 * @param h 矩形的高度
 * @param deg 因为transform导致的角度变化
 * @returns {Array} 路径点数组
 */
function rectProxy(x, y, w, h, deg) {
  var c = {x: x + w / 2, y: y + h / 2}, points = [], r;
  r = Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2)) / 2;
  deg = deg * Math.PI / 180;

  var deg1 = (Math.PI - Math.acos((w / 2) / r)) - parseFloat(deg),
    deg2 = Math.acos((w / 2) / r) - parseFloat(deg),
    deg3 = - Math.acos((w / 2) / r) - parseFloat(deg),
    deg4 = Math.PI + Math.acos((w / 2) / r) - parseFloat(deg);

  points.push({
    t: 'M',
    x: c.x + r * Math.cos(deg1),
    y: c.y - r * Math.sin(deg1)
  });
  points.push({
    t: 'L',
    x: c.x + r * Math.cos(deg2),
    y: c.y - r * Math.sin(deg2)
  });
  points.push({
    t: 'L',
    x: c.x + r * Math.cos(deg3),
    y: c.y - r * Math.sin(deg3)
  });
  points.push({
    t: 'L',
    x: c.x + r * Math.cos(deg4),
    y: c.y - r * Math.sin(deg4)
  });
  return points;
}

module.exports = function(rects, context) {
  var len = rects.length, points;
  var x, y, w, h, deg = 0, node;

  for (var n = 0; n < len; n++) {
    node = rects.item(n);
    x = +node.getAttribute('x');
    y = +node.getAttribute('y');
    w = +node.getAttribute('width');
    h = +node.getAttribute('height');

    points = rectProxy(x, y, w, h, deg);
    c.convertNodeToPath(points, node, context);
  }
};