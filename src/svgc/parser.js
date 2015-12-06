var Sax = require('sax')

var config = {
  strict: true,
  trim: true,
  normalize: true,
  lowercase: true,
  xmlns: true,
  position: false
};

var sax = Sax.parser(config.strict, config);

module.exports = function(data) {
  sax.ondoctype =
    sax.onopentag =
      sax.oncdata =
        sax.onclosetag =
          sax.ontext =
            sax.onerror =
              sax.oncomment = function(data) {
                console.log(data);
              };
  sax.write(data).close();
};