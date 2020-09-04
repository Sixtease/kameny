import 'phaser';
import './game.scss';

import { Main_scene, game_config } from './scenes/Main_scene';

export const game = new Phaser.Game(game_config);
export const get_scene = () => game.scene.getScene('Kameny') as Main_scene;
