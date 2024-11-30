import { CARD_SET } from '../constants/cards';
import {
  get_player_deck,
  restore_player_deck,
  get_card_scene,
  get_main_scene,
} from '../game';
import { init_guide_off } from '../guide/init';
import {
  EMPTY_EVENT,
  Game_event,
  add_evt as _add_evt,
  hist,
  is_Present_cards,
} from './events';
import { get_current_position } from './logic';
import { get_coord } from './place_info';
import { set_latest_seen_event_index } from './render';


export function restore_game(history: Game_event[], { cards, set, cursor }: { cards: string[], set: CARD_SET, cursor: number }) {
  get_card_scene().switch_off();
  for (let last_event = history.at(-1); is_Present_cards(last_event); last_event = EMPTY_EVENT) {
    cursor -= last_event.payload.cards.length;
    history.pop();
  }
  hist.length = 0;
  hist.push(...history);
  get_main_scene().setup_avatar(set);
  set_latest_seen_event_index(hist.length);
  const last_location = get_current_position(history.at(-1));
  const last_coord = get_coord(last_location.place_name, last_location.field_index);
  get_main_scene().instant_move_avatar(last_coord);
  restore_player_deck(set, cards, cursor);
  init_guide_off();
}

export function load_game() {
  const saved_history = localStorage.getItem('hist');
  const saved_deck = localStorage.getItem('deck');
  if (!saved_history || !saved_deck) {
    alert('No saved game found');
    return;
  }
  const history = JSON.parse(saved_history);
  const { cards, set, cursor } = JSON.parse(saved_deck);

  restore_game(history, { cards, set, cursor });
}

function save_game() {
  const player_deck = get_player_deck();
  if (!player_deck) {
    return;
  }
  localStorage.setItem('hist', JSON.stringify(hist));
  localStorage.setItem('deck', JSON.stringify({ cards: player_deck.cards, set: player_deck.set, cursor: player_deck.cursor }));
}

export function check_saved_game() {
  const saved_history = localStorage.getItem('hist');
  const saved_deck = localStorage.getItem('deck');
  return !!(saved_history && saved_deck);
}

export function clear_saved_game() {
  localStorage.removeItem('hist');
  localStorage.removeItem('deck');
}

export function add_evt<T extends Game_event>(e: T): T {
  _add_evt<T>(e);
  save_game();
  return e;
}
