/**
 * Converts all basic shapes to path, and merge all paths.
 * @see http://www.w3.org/TR/SVG/shapes.html
 */

import fs from 'fs'
import Q from 'q'
import co from 'co'
import parser from './parser.js'

co(function* () {
  let file = yield Q.nfcall(fs.readFile, '/Users/malcolm/Git/my/svg_crush/test/test.svg');
  parser(file);
}).catch(err => {
  console.error(err.stack);
});