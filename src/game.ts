import 'phaser';
import './game.scss';

import { Main_scene } from './scenes/Main_scene';
import { Card_scene} from './scenes/Card_scene';
import { get_game_config } from './game/config';
import { CardDeck } from './cards';
import { CARD_SET, Mother_card, Child_card, Melchisedech_card } from './constants/cards';

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

let player_deck: CardDeck = null;
export function get_player_deck(): CardDeck {
  return player_deck;
}
export function set_player_deck(set: CARD_SET) {
  if (player_deck !== null) {
    throw new Error('deck already set');
  }
  switch (set) {
    case CARD_SET.mother:       player_deck = new CardDeck<Mother_card      >(set); break;
    case CARD_SET.child:        player_deck = new CardDeck<Child_card       >(set); break;
    case CARD_SET.melchisedech: player_deck = new CardDeck<Melchisedech_card>(set); break;
    default: throw new Error('unexpected card set for player deck');
  }
}
