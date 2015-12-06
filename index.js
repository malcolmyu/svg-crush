var Doc = require('./src');

var doc = new Doc('./test/test.svg');

doc.crush('./test/test.min.svg')
  .catch(function(err) {
    console.log(err.stack);
  });