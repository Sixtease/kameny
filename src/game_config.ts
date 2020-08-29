import 'phaser';
import MoveToPlugin from 'phaser3-rex-plugins/plugins/moveto-plugin';
import { Main_scene } from './scenes/Main_scene';
import { viewport_width, viewport_height } from './constants';

export const game_config = {
  type: Phaser.AUTO,
  width: viewport_width,
  height: viewport_height,
  scene: Main_scene,
  plugins: {
    global: [
      { key: 'rexMoveTo', plugin: MoveToPlugin, start: true },
    ],
  },
};
