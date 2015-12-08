var SC = require('./src');

var sc = new SC('./test/test.svg');

sc.crush('./test/test.min.svg')
  .catch(function(err) {
    console.log(err.stack);
  });