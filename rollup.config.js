// rollup.config.js

import common from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import json from 'rollup-plugin-json';
import globals from 'rollup-plugin-node-globals';

export default {
  input: 'src/js/main.js',
  output: {
    file: 'dist/js/index.js',
    format: 'cjs',
  },
  plugins: [
    common(),
    globals(),
    resolve(),
    json(),
  ],
};
