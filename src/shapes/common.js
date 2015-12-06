var namespace = "http://www.w3.org/2000/svg";

var pathMap = {
  M: 'M$x,$y',
  L: 'L$x,$y',
  A: 'A$rx,$ry,$xar,1,0,$dx,$dy'
};

function convertPointsToPath(points, unclosed) {
  return points.map(function(point) {
      return pathMap[point.t].replace(/\$(\w+)/g, function(_, m) {
        return point[m].toFixed(3).replace(/\.?0*$/, '');
      });
    }).join('') + (unclosed ? '' : 'Z');
}

exports.convertNodeToPath = function(points, node, context, unclosed) {
  var path = context.createElementNS(namespace, 'path');
  path.setAttribute('d', convertPointsToPath(points, unclosed));
  node.parentNode.replaceChild(path, node);
};