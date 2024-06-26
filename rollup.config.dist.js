import commonjs from 'rollup-plugin-commonjs';
import copy from 'rollup-plugin-copy';
import resolve from 'rollup-plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import scss from 'rollup-plugin-scss';
import json from 'rollup-plugin-json';
import typescript from 'rollup-plugin-typescript2';

export default {

  //  Our games entry point (edit as required)
  input: [
    './src/game.ts',
  ],

  //  Where the build file is to be generated.
  //  Most games being built for distribution can use iife as the module type.
  //  You can also use 'umd' if you need to ingest your game into another system.
  //  The 'intro' property can be removed if using Phaser 3.21 or above. Keep it for earlier versions.
  output: {
    file: './dist/game.js',
    name: 'MyGame',
    format: 'iife',
    sourcemap: false,
    intro: 'var global = window;',
  },

  plugins: [
    copy({
      targets: [
        { src: 'src/assets', dest: 'dist/' },
        { src: 'src/index.html', dest: 'dist/' },
      ],
    }),

    //  Toggle the booleans here to enable / disable Phaser 3 features:
    replace({
      'typeof CANVAS_RENDERER': JSON.stringify(true),
      'typeof WEBGL_RENDERER': JSON.stringify(true),
      'typeof EXPERIMENTAL': JSON.stringify(true),
      'typeof PLUGIN_CAMERA3D': JSON.stringify(false),
      'typeof PLUGIN_FBINSTANT': JSON.stringify(false),
      'typeof FEATURE_SOUND': JSON.stringify(true),
    }),

    //  Parse our .ts source files
    resolve({
      extensions: [ '.ts', '.tsx' ],
    }),

    //  We need to convert the Phaser 3 CJS modules into a format Rollup can use:
    commonjs({
      include: [
        'node_modules/eventemitter3/**',
        'node_modules/phaser/**',
      ],
      exclude: [ 
        'node_modules/phaser/src/polyfills/requestAnimationFrame.js',
      ],
      sourceMap: false,
      ignoreGlobal: true,
    }),

    //  See https://www.npmjs.com/package/rollup-plugin-typescript2 for config options
    typescript(),

    scss(),
    json(),

    //  See https://www.npmjs.com/package/rollup-plugin-uglify for config options
    /*
    uglify({
      mangle: false,
    }),
    */

  ],
};
