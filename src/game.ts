import 'phaser';

import './game.scss';

import { viewport_width, viewport_height } from './constants';
import { Main_scene } from './scenes/Main_scene';

const config = {
  type: Phaser.AUTO,
  width: viewport_width,
  height: viewport_height,
  scene: Main_scene,
};

const game = new Phaser.Game(config);
