import typescript from 'rollup-plugin-typescript';
// import PrototypeMinify from "rollup-plugin-prototype-minify";
import { uglify } from "rollup-plugin-uglify";
import resolve from "rollup-plugin-node-resolve";
import cssbundle from 'rollup-plugin-css-bundle';

const pkg = require("./package.json");
const banner = require("./config/banner");
const plugin = typescript({
  "module": "es2015",
  "target": "es3",
  "lib": ["es2015", "dom"],
  "exclude": "node_modules/**",
  "sourceMap": true,
});
const uglifyCode = uglify({
  sourcemap: true,
  output: {
    comments: function (node, comment) {
      var text = comment.value;
      var type = comment.type;
      if (type === "comment2") {
        // multiline comment
        return /daybrush\.github\.io/.test(text);
      }
    },
  },
});

export default {
  input: 'src/index.ts',
  plugins: [
    plugin,
    resolve(),
    cssbundle({output: "./dist/index.css"}),
    uglifyCode,
  ],
  output: {
    file: `./dist/index.js`,
    banner,
    format: "iife",
    freeze: false,
    exports: "named",
    interop: false,
    sourcemap: true,
  },
};