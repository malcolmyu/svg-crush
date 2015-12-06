'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _co = require('co');

var _co2 = _interopRequireDefault(_co);

var _parser = require('./parser.js');

var _parser2 = _interopRequireDefault(_parser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Converts all basic shapes to path, and merge all paths.
 * @see http://www.w3.org/TR/SVG/shapes.html
 */

(0, _co2.default)(regeneratorRuntime.mark(function _callee() {
  var file;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _q2.default.nfcall(_fs2.default.readFile, '/Users/malcolm/Git/my/svg_crush/test/test.svg');

        case 2:
          file = _context.sent;

          (0, _parser2.default)(file);

        case 4:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, this);
})).catch(function (err) {
  console.error(err.stack);
});