import 'phaser';
import './game.scss';

import { game_config } from './game_config';
import { Main_scene } from './scenes/Main_scene';

export const game = new Phaser.Game(game_config);
export const get_scene = () => game.scene.getScene('Kameny') as Main_scene;
