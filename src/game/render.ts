import {
  is_Birth_gate_select,
  is_End_game,
  is_Enter_road,
  is_Enter_spot,
  is_Field_progress,
  is_Pick_cards,
  is_Present_avatars,
  is_Present_cards,
  is_Recap_game,
  is_Select_player,
  Game_event,
  hist,
} from './events';
import { CARD_SET, Card, GlobalCard } from '../constants/cards';
import { CROSSROAD_CARD_SET } from '../constants/crossroad-cards';
import * as Coords from '../constants/coords';
import { Road_name, Spot_name, world_center } from '../constants/places';
import { get_main_scene, get_card_scene, set_player_deck } from '../game';
import { recap_game } from '../templates/recap-game';
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
  } else if (is_End_game(evt)) {
    go_to_spot(world_center);
  } else if (is_Present_avatars(evt)) {
    present_avatars(evt.payload.on_select);
  } else if (is_Select_player(evt)) {
    set_player_deck(evt.payload.card_set);
    get_main_scene().setup_avatar(evt.payload.card_set);
  } else if (is_Pick_cards(evt)) {
    present_cards(evt.payload.cards, evt.payload.set, () => {});
  } else if (is_Recap_game(evt)) {
    recap_game();
  } else {
    console.warn(`unknown event ${evt.evt_name}`);
  }
  evt.processed = true;
}

function go_to_spot(spot_name: Spot_name) {
  const spot_coord = Coords.spots[spot_name];
  get_main_scene().avatar_move.moveTo(spot_coord.x, spot_coord.y);
}

function go_to_field(road_name: Road_name, field_index: number) {
  const road = Coords.roads[road_name];
  const field_coord = road[field_index];
  get_main_scene().avatar_move.moveTo(field_coord.x, field_coord.y);
}

function present_cards(cards: Card[], set: CARD_SET | CROSSROAD_CARD_SET, on_select: (card: GlobalCard) => void) {
  get_card_scene().show_cards(cards.map(card => ({ id: card, set }))).then(on_select);
}

function present_avatars(on_select: (set: CARD_SET) => void) {
  get_card_scene().show_avatars().then(on_select);
}
