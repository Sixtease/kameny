import * as Places from '../constants/places';
import { DIRECTION } from './place_info';
import { CARD_SET, Card, GlobalCard, Single_set_cards } from '../constants/cards';
import { CROSSROAD_CARD_SET } from '../constants/crossroad-cards';

export interface Game_event {
  evt_name: string;
  processed: boolean;
  payload: {};
}
export function is_Game_event(evt: any): evt is Game_event {
  return evt.hasOwnProperty('evt_name');
}

export const EMPTY_EVENT: Game_event = {
  evt_name: 'EMPTY_EVENT',
  processed: false,
  payload: {},
};

export interface Select_place extends Game_event {
  evt_name: 'Select_place';
  payload: {
    candidate_places: Places.Place_name[];
    selected_place: Places.Place_name;
  };
}
export function is_Select_place(evt: Game_event): evt is Select_place {
  return evt.evt_name === 'Select_place';
}

export interface Movement_event extends Game_event {
  payload: {
    place_name: Places.Place_name;
  }
}
export function is_movement_event(evt: Game_event): evt is Movement_event {
  return evt.payload.hasOwnProperty('place_name');
}

export interface Birth_gate_select extends Movement_event {
  evt_name: 'Birth_gate_select';
  payload: {
    place_name: Places.Gate_name;
  };
}
export function is_Birth_gate_select(evt: Game_event): evt is Birth_gate_select {
  return evt.evt_name === 'Birth_gate_select';
}

export interface Field_progress extends Movement_event {
  evt_name: 'Field_progress';
  payload: {
    place_name: Places.Road_name;
    field_index: number;
    direction: DIRECTION;
  };
}
export function is_Field_progress(evt: Game_event): evt is Field_progress {
  return evt.evt_name === 'Field_progress';
}

export interface Landed extends Game_event {
  evt_name: 'Landed';
}
export function is_Landed(evt: Game_event): evt is Landed {
  return evt.evt_name === 'Landed';
}

export interface Enter_spot extends Movement_event {
  evt_name: 'Enter_spot';
  payload: {
    place_name: Places.Spot_name;
  };
}
export function is_Enter_spot(evt: Game_event): evt is Enter_spot {
  return evt.evt_name === 'Enter_spot';
}

export interface Enter_road extends Movement_event {
  evt_name: 'Enter_road';
  payload: {
    place_name: Places.Road_name;
    field_index: number;
    direction: DIRECTION;
  };
}
export function is_Enter_road(evt: Game_event): evt is Enter_road {
  return evt.evt_name === 'Enter_road';
}

export interface Present_avatars extends Game_event {
  evt_name: 'Present_avatars';
  payload: {
    on_select: (avatar: CARD_SET) => void;
  }
}
export function is_Present_avatars (evt: Game_event): evt is Present_avatars {
  return evt.evt_name === 'Present_avatars';
}

export interface Present_cards extends Game_event {
  evt_name: 'Present_cards';
  payload: {
    cards: Single_set_cards,
    set: CARD_SET;
    permutation: number[];
    on_select: (card: GlobalCard) => void;
    choices?: any[];
  };
}
export function is_Present_cards(evt: Game_event): evt is Present_cards {
  return evt.evt_name === 'Present_cards';
}

export interface Select_from_presented_cards extends Game_event {
  evt_name: 'Select_from_presented_cards';
  payload: {
    card_index: number;
    index: number;
    card: GlobalCard;
  }
}
export function is_Select_from_presented_cards(evt: Game_event): evt is Select_from_presented_cards {
  return evt.evt_name === 'Select_from_presented_cards';
}

export interface Pick_cards extends Game_event {
  evt_name: 'Pick_cards',
  payload: {
    cards: Card[];
    set: CARD_SET | CROSSROAD_CARD_SET;
  }
}
export function is_Pick_cards(evt: Game_event): evt is Pick_cards {
  return evt.evt_name === 'Pick_cards';
}

export interface End_game extends Game_event {
  evt_name: 'End_game';
}
export function is_End_game(evt: Game_event): evt is End_game {
  return evt.evt_name === 'End_game';
}

export interface Select_player extends Game_event {
  evt_name: 'Select_player';
  payload: {
    card_set: CARD_SET;
  };
}
export function is_Select_player(evt: Game_event): evt is Select_player {
  return evt.evt_name === 'Select_player';
}

export interface Recap_game extends Game_event {
  evt_name: 'Recap_game';
}
export function is_Recap_game(evt: Game_event): evt is Recap_game {
  return evt.evt_name === 'Recap_game';
}

export type Draw_event = Select_from_presented_cards | Pick_cards;
export const is_Draw_event = (evt: Game_event): evt is Draw_event => is_Select_from_presented_cards(evt) || is_Pick_cards(evt);

export const hist: Game_event[] = [];
export function add_evt<T extends Game_event>(e: T): T {
  hist.push(e);
  return e;
};
;;; (window as any).hist = hist;

export function find_event_backward<T extends Game_event>(discriminator: (evt: Game_event) => evt is T, starting_point?: number | Game_event, include_self = false): T {
  const start_idx
    = typeof starting_point === 'number'  ? starting_point
    : starting_point                      ? hist.lastIndexOf(starting_point)
    :                                       hist.length;
  const start = include_self && start_idx < hist.length ? start_idx : start_idx - 1;
  for (let i = start; i >= 0; i--) {
    const evt = hist[i];
    if (discriminator(evt)) {
      return evt;
    }
  }
  return null;
}
export function event_occurred(evt_name: string, starting_point?: number | Game_event): Game_event {
  const disc = (evt: Game_event): evt is Game_event => evt.evt_name === evt_name;
  return find_event_backward(disc, starting_point);
}

export function find_event_forward<T extends Game_event>(discriminator: (evt: Game_event) =>  evt is T, starting_point?: number | Game_event): T {
  const start_idx
    = typeof starting_point === 'number'  ? starting_point
    : starting_point                      ? hist.lastIndexOf(starting_point)
    :                                       -1;
  for (let i = start_idx + 1; i < hist.length; i++) {
    const evt = hist[i];
    if (discriminator(evt)) {
      return evt;
    }
  }
  return null;
}

export function event_occurred_after(evt_name: string, starting_point?: number | Game_event): Game_event {
  const disc = (evt: Game_event): evt is Game_event => evt.evt_name === evt_name;
  return find_event_forward(disc, starting_point);
}
