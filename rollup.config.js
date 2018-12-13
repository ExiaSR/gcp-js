import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

export default [
  // browser-friendly UMD build
  {
    input: 'src/index.js',
    output: {
      name: 'GCP',
      file: pkg.browser,
      format: 'umd',
    },
    plugins: [
      babel({
        exclude: 'node_modules/**',
      }),
      resolve(),
      commonjs(),
      terser(),
    ],
  },
  {
    input: 'src/index.js',
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
    plugins: [
      babel({
        exclude: 'node_modules/**',
      }),
    ],
  },
];
