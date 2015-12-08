var assert = require('assert');
var gm = require('../../src/transform/matrix').getTransformMatrix;

describe('matrix.getTransformMatrix', function() {
  it('translate(30, 50)', function() {
      var matrix = gm('translate(30 50)');
      assert(matrix[0] === 1);
      assert(matrix[1] === 0);
      assert(matrix[2] === 0);
      assert(matrix[3] === 1);
      assert(matrix[4] === 30);
      assert(matrix[5] === 50);
  });
  it('all transform mixed', function() {
    var matrix = gm('matrix ( 1 , 0,   0 , 1.2,1, 4) rotate(30, 50, 50)  translate(10, 10)  skewX(11)');
    assert(matrix[0] === 0.8660254037844387);
    assert(matrix[1] === 0.5999999999999999);
    assert(matrix[2] === -0.3316617142912633);
    assert(matrix[3] === 1.1558586700239575);
    assert(matrix[4] === 36.35898384862245);
    assert(matrix[5] === -1.5692193816530526);
  });
});