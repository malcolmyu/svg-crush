'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (data) {
  _sax2.default.write(data).close();
};

var _sax = require('sax');

var _sax2 = _interopRequireDefault(_sax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = {
  strict: true,
  trim: true,
  normalize: true,
  lowercase: true,
  xmlns: true,
  position: false
};

var parser = _sax2.default.parser(config.strict, config);

_sax2.default.ondoctype = _sax2.default.onopentag = _sax2.default.oncdata = _sax2.default.onclosetag = _sax2.default.ontext = _sax2.default.onerror = _sax2.default.oncomment = function (data) {
  return console.log(data);
};