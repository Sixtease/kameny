import * as Places from '../constants/places';
import { DIRECTION } from './place_info';
import { CARD_SET, Card, GlobalCard } from '../constants/cards';

export interface Game_event {
  evt_name: string;
  processed: boolean;
  payload: {};
}
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
export function is_Movement_event(evt: Game_event): evt is Movement_event {
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
export interface Present_cards extends Game_event {
  evt_name: 'Present_cards';
  payload: {
    cards: Card[];
    set: CARD_SET;
    permutation: number[];
    on_select: (card: GlobalCard) => void;
  };
}
export function is_Present_cards(evt: Game_event): evt is Present_cards {
  return evt.evt_name === 'Present_cards';
}
export interface Select_from_presented_cards extends Game_event {
  evt_name: 'Select_from_presented_cards';
  payload: {
    index: number;
  }
}
export function is_Select_from_presented_cards(evt: Game_event): evt is Select_from_presented_cards {
  return evt.evt_name === 'Select_from_presented_cards';
}

export const hist: Game_event[] = [];
export function add_evt<T extends Game_event>(e: T): T {
  hist.push(e);
  return e;
};
