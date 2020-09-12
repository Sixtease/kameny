import 'phaser';
import './game.scss';

import { Main_scene } from './scenes/Main_scene';
import { Card_scene} from './scenes/Card_scene';
import { get_game_config } from './game/config';

export const game = new Phaser.Game(get_game_config());
export function get_scene<T extends Phaser.Scene>(key: string): T {
  return game.scene.getScene(key) as T;
}
export function get_main_scene () {
  return get_scene<Main_scene>('Main');
}
export function get_card_scene() {
  return get_scene<Card_scene>('Cards');
}
