import {
  is_Birth_gate_select,
  is_Enter_road,
  is_Enter_spot,
  is_Field_progress,
  is_Present_cards,
  Game_event,
  hist,
} from './events';
import { CARD_SET, Card, GlobalCard } from '../constants/cards';
import * as Coords from '../constants/coords';
import { Road_name, Spot_name } from '../constants/places';
import { get_main_scene, get_card_scene } from '../game';
let seen_i = 0;

export function process_events() {
  while (hist[seen_i]) {
    process_event(hist[seen_i++]);
  }
};

function process_event(evt: Game_event) {
  console.log('processing event', evt);
  if (is_Field_progress(evt) || is_Enter_road(evt)) {
    go_to_field(evt.payload.place_name, evt.payload.field_index);
  } else if (is_Enter_spot(evt) || is_Birth_gate_select(evt)) {
    go_to_spot(evt.payload.place_name);
  } else if (is_Present_cards(evt)) {
    present_cards(evt.payload.cards, evt.payload.set, evt.payload.on_select);
  } else {
    console.warn(`unknown event ${evt.evt_name}`);
  }
  evt.processed = true;
}

function go_to_spot(spot_name: Spot_name) {
  const spot_coord = Coords.spots[spot_name];
  get_scene().avatar_move?.moveTo(spot_coord.x, spot_coord.y);
}

function go_to_field(road_name: Road_name, field_index: number) {
  const road = Coords.roads[road_name];
  const field_coord = road[field_index];
  get_scene().avatar_move?.moveTo(field_coord.x, field_coord.y);
  get_main_scene().avatar_move.moveTo(field_coord.x, field_coord.y);
}

function present_cards(cards: Card[], set: CARD_SET, onSelect: (card: GlobalCard) => void) {
  get_scene().show_cards(cards.map(card => ({ id: card, set })));
}
