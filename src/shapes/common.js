exports.namespace = "http://www.w3.org/2000/svg";

var pathMap = {
  M: 'M$x $y',
  L: 'L$x $y',
  A: 'A$rx $ry $xar 1 0 $dx $dy'
};

exports.convertPointsToPath = function(points) {
  return points.map(function(point) {
      return pathMap[point.t].replace(/\$(\w+)/g, function(_, m) {
        return point[m].toFixed(3).replace(/\.?0*$/, '');
      })
    }).join('') + 'Z';
};
