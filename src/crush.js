exports.mergePaths = function(svg) {
  var paths = svg.getElementsByTagName('path');
  var len = paths.length, d = '';

  for (var n = 0; n < len; n++) {
    var node = paths.item(n);
    d += node.getAttribute('d');
    if (n > 0) {
      node.parentNode.removeChild(node);
    }
  }

  paths.item(0).setAttribute('d', d);
};