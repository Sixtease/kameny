import 'phaser';
import './game.scss';

import { Main_scene } from './scenes/Main_scene';
import { Card_scene} from './scenes/Card_scene';
import { Drawn_cards_scene } from './scenes/Drawn_cards_scene';
import { Controls_scene } from './scenes/Controls_scene';
import { get_game_config } from './game/config';
import { add_evt as _add_evt } from './game/events';
import { CardDeck } from './cards';
import { CARD_SET, MotherCardPackage, ChildCardPackage, MelchisedechCardPackage } from './constants/cards';
import { SceneName } from './constants/scenes';
import { cover_page } from './templates/cover-page';

export const game = new Phaser.Game(get_game_config());
export function get_scene<T extends Phaser.Scene>(key: SceneName): T {
  return game.scene.getScene(key) as T;
}
export function get_main_scene () {
  return get_scene<Main_scene>(SceneName.Main);
}
export function get_card_scene() {
  return get_scene<Card_scene>(SceneName.Cards);
}
export function get_drawn_cards_scene() {
  return get_scene<Drawn_cards_scene>(SceneName.Drawn_cards);
}
export function get_controls_scene() {
  return get_scene<Controls_scene>(SceneName.Controls);
}

let player_deck: CardDeck = null;
export function get_player_deck(): CardDeck {
  return player_deck;
}
export function set_player_deck(set: CARD_SET) {
  if (player_deck !== null) {
    console.warn('deck already set');
    return;
  }
  switch (set) {
    case CARD_SET.mother:       player_deck = new CardDeck<MotherCardPackage      >(set); break;
    case CARD_SET.child:        player_deck = new CardDeck<ChildCardPackage       >(set); break;
    case CARD_SET.melchisedech: player_deck = new CardDeck<MelchisedechCardPackage>(set); break;
    default: throw new Error('unexpected card set for player deck');
  }
}

export function restore_player_deck(set: CARD_SET, cards: string[], cursor: number) {
  switch (set) {
    case CARD_SET.mother:       player_deck = new CardDeck<MotherCardPackage      >(set, cards as MotherCardPackage['Card'][],       cursor); break;
    case CARD_SET.child:        player_deck = new CardDeck<ChildCardPackage       >(set, cards as ChildCardPackage['Card'][],        cursor); break;
    case CARD_SET.melchisedech: player_deck = new CardDeck<MelchisedechCardPackage>(set, cards as MelchisedechCardPackage['Card'][], cursor); break;
    default: throw new Error('unexpected card set for player deck');
  }
}

cover_page();
