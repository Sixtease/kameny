import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

import { firebaseConfig } from '../constants';
import { CARD_SET } from '../constants/cards';
import {
  get_player_deck,
  restore_player_deck,
  get_card_scene,
  get_controls_scene,
  get_main_scene,
} from '../game';
import { init_guide_off } from '../guide/init';
import { recap_game } from '../templates/recap-game';
import {
  EMPTY_EVENT,
  Game_event,
  add_evt as _add_evt,
  hist,
  is_End_game,
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

  for (let i = history.length - 1; i >= 0; i--) {
    if (is_End_game(history[i])) {
      console.log('restoring recap');
      get_controls_scene().scene.sendToBack();
      setTimeout(recap_game, 0);
      break;
    }
  }
}

export function load_game() {
  const saved_game = localStorage.getItem('game');
  if (!saved_game) {
    alert('No saved game found');
    return;
  }
  const { hist: history, deck } = JSON.parse(saved_game);

  restore_game(history, deck);
}

function get_game() {
  const player_deck = get_player_deck();
  if (!player_deck) {
    return null;
  }
  const game = {
    hist,
    deck: { cards: player_deck.cards, set: player_deck.set, cursor: player_deck.cursor },
  };
  return game;
}

function save_game() {
  const game = get_game();
  if (!game) {
    return null;
  }
  const game_json = JSON.stringify(game);
  localStorage.setItem('game', game_json);
}

export function check_saved_game() {
  const saved_game = localStorage.getItem('game');

  /* TODO: remove legacy save format */
  const saved_history = localStorage.getItem('hist');
  const saved_deck = localStorage.getItem('deck');
  if (!saved_game && saved_history && saved_deck) {
    localStorage.setItem('game', JSON.stringify({ hist: JSON.parse(saved_history), deck: JSON.parse(saved_deck) }));
    localStorage.removeItem('hist');
    localStorage.removeItem('deck');
    return true;
  }

  return !!saved_game;
}

export function clear_saved_game() {
  localStorage.removeItem('hist');
  localStorage.removeItem('deck');
  localStorage.removeItem('game');
  localStorage.removeItem('game_id');
}

export function add_evt<T extends Game_event>(e: T): T {
  _add_evt<T>(e);
  save_game();
  return e;
}

function get_user_id() {
  let user_id = localStorage.getItem('user_id');
  if (!user_id) {
    const new_user_id = crypto.randomUUID();
    localStorage.setItem('user_id', new_user_id);
    user_id = new_user_id;
  }
  return user_id;
}

export function get_game_id() {
  let game_id = localStorage.getItem('game_id');
  if (!game_id) {
    const new_game_id = new Date().toISOString();
    localStorage.setItem('game_id', new_game_id);
    game_id = new_game_id;
  }
  return game_id;
}

export async function harvest_game() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const user_id = get_user_id();
  const game_id = get_game_id();
  const end_time = new Date().toISOString();
  const document_id = `${user_id}/${game_id}-${end_time}`;
  const game = get_game();
  try {
    const docRef = doc(db, 'games', document_id);
    const pruned_game = JSON.parse(JSON.stringify(game));
    await setDoc(docRef, pruned_game);
    console.log("Document written successfully!");
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}
