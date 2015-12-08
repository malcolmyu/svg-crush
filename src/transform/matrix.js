var regTransform = /\s*(matrix|translate|scale|rotate|skewX|skewY)\s*\(\s*(.+?)\s*\)[\s,]*/g;

// 弧度、角度转换工具
var rad = {
  _rad: function(deg) {
    return deg * Math.PI / 180;
  },
  cos: function(deg) {
    return Math.cos(this._rad(deg));
  },
  sin: function(deg) {
    return Math.sin(this._rad(deg));
  },
  tan: function(deg) {
    return Math.tan(this._rad(deg));
  }
};

/**
 * 将一个节点的所有非matrix变换转化为matrix
 * @param {String} type 变换类型
 * @param {Array} params 变换参数数组
 * @returns {Array} matrix矩阵数组
 */
function transform2Matrix(type, params) {
  // 将所有非matrix的变换类型转换为matrix
  // 可以参见http://www.zhangxinxu.com/wordpress/2012/06/css3-transform-matrix-%E7%9F%A9%E9%98%B5/
  var matrix;

  switch (type) {
    case 'translate':
      // [1, 0, 0, 1, tx, ty]
      matrix = [1, 0, 0, 1, params[0], params[1] || 0];
      break;
    case 'scale':
      // [sx, 0, 0, sy, 0, 0]
      matrix = [params[0], 0, 0, params[1] || params[0], 0, 0];
      break;
    case 'rotate':
      // [cos(a), sin(a), -sin(a), cos(a), x, y]
      var cos = rad.cos(params[0]);
      var sin = rad.sin(params[0]);
      var cx = params[1] || 0;
      var cy = params[2] || 0;

      matrix = [cos, sin, -sin, cos, (1 - cos) * cx + sin * cy, (1 - cos) * cy - sin * cx];
      break;
    case 'skewX':
      // [1, 0, tan(a), 1, 0, 0]
      matrix = [1, 0, rad.tan(params[0]), 1, 0, 0];
      break;
    case 'skewY':
      // [1, tan(a), 0, 1, 0, 0]
      matrix = [1, rad.tan(params[0]), 0, 1, 0, 0];
      break;
    default:
      matrix = params;
  }

  return matrix;
}

/**
 * 转化matrix对外接口
 * @param {String} transform 节点的transform属性
 * @returns {Array} matrix矩阵数组
 */
exports.getTransformMatrix = function(transform) {
  var matrices = [];

  transform.replace(regTransform, function(_, type, param) {
    var params = param.split(/[\s,]+/).map(function(param) {
      return +param;
    });
    matrices.push(transform2Matrix(type, params));
  });

  return matrices.reduce(multiplyMatrices);
};

/**
 * matrix转化成矩阵：
 * [a0, a1, a2, a3, a4, a5] => [[a0 a2 a4] [a1 a3 a5] [0 0 1]]
 *
 * 矩阵相乘：
 * [[a0 a2 a4] [a1 a3 a5] [0 0 1]] *
 * [[b0 b2 b4] [b1 b3 b5] [0 0 1]] =
 * [
 *   [a0 * [b0 b2 b4] + a2 * [b1 b3 b5] + a4 * [0 0 1]]
 *   [a1 * [b0 b2 b4] + a3 * [b1 b3 b5] + a5 * [0 0 1]]
 *   [0 * [b0 b2 b4] + 0 * [b1 b3 b5] + 1 * [0 0 1]]
 * ] =
 * [
 *   [a0 * b0 + a2 * b1, a0 * b2 + a2 * b3, a0 * b3 + a2 * b5 + a4]
 *   [a1 * b0 + a3 * b1, a1 * b2 + a3 * b3, a1 * b4 + a3 * b5 + a5]
 *   [0, 0, 1]
 * ]
 * @param {Array} a 矩阵a
 * @param {Array} b 矩阵b
 * @returns {Array}
 */
function multiplyMatrices(a, b) {
  return [
    a[0] * b[0] + a[2] * b[1],
    a[1] * b[0] + a[3] * b[1],
    a[0] * b[2] + a[2] * b[3],
    a[1] * b[2] + a[3] * b[3],
    a[0] * b[4] + a[2] * b[5] + a[4],
    a[1] * b[4] + a[3] * b[5] + a[5]
  ]
}