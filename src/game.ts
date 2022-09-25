import 'phaser';
import './game.scss';

import { Main_scene } from './scenes/Main_scene';
import { Card_scene} from './scenes/Card_scene';
import { Drawn_cards_scene } from './scenes/Drawn_cards_scene';
import { get_game_config } from './game/config';
import { CardDeck } from './cards';
import { CARD_SET, MotherCardPackage, ChildCardPackage, MelchisedechCardPackage } from './constants/cards';

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
export function get_drawn_cards_scene() {
  return get_scene<Drawn_cards_scene>('Drawn_cards');
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
    case CARD_SET.mother:       player_deck = new CardDeck<MotherCardPackage      >(set); break;
    case CARD_SET.child:        player_deck = new CardDeck<ChildCardPackage       >(set); break;
    case CARD_SET.melchisedech: player_deck = new CardDeck<MelchisedechCardPackage>(set); break;
    default: throw new Error('unexpected card set for player deck');
  }
}
