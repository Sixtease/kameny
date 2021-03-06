import 'phaser';
import MoveTo from 'phaser3-rex-plugins/plugins/moveto.js';
import {
  viewport_height,
  viewport_width,
} from '../constants';
import { Main_scene } from '../scenes/Main_scene';
import { Card_scene } from '../scenes/Card_scene';

let game_config: Phaser.Types.Core.GameConfig | undefined = undefined;
export function get_game_config(): Phaser.Types.Core.GameConfig {
  if (game_config === undefined) {
    game_config = {
      type: Phaser.AUTO,
      width: viewport_width,
      height: viewport_height,
      scene: [ Main_scene, Card_scene ],
      plugins: {
        global: [
          { key: 'rexMoveTo', plugin: MoveTo, start: true },
        ],
      },
    }
  }
  return game_config
;}
