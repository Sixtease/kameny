import {
  is_Draw_event,
  is_Birth_gate_select,
  is_End_game,
  is_Enter_road,
  is_Enter_spot,
  is_Field_progress,
  is_Pick_cards,
  is_Present_avatars,
  is_Present_cards,
  is_Recap_game,
  is_Select_from_presented_cards,
  is_Select_player,
  Game_event,
  hist,
} from './events';
import { get_current_position } from './logic';
import { get_coord } from './place_info';
import { CARD_SET, Card, GlobalCard } from '../constants/cards';
import { CROSSROAD_CARD_SET } from '../constants/crossroad-cards';
import * as Coords from '../constants/coords';
import { Road_name, Spot_name, world_center } from '../constants/places';
import {
  get_card_scene,
  get_controls_scene,
  get_drawn_cards_scene,
  get_main_scene,
  restore_player_deck,
  set_player_deck,
} from '../game';
import { update_guide } from '../guide/lookup';
import { recap_game } from '../templates/recap-game';

let seen_i = 0;

export function process_events() {
  while (hist[seen_i]) {
    process_event(hist[seen_i++]);
  }
};

function process_event(evt: Game_event) {
  if (evt.processed) {
    console.log('skipping processed event', evt);
    return;
  }
  console.log('processing event', evt);
  if (is_Field_progress(evt) || is_Enter_road(evt)) {
    go_to_field(evt.payload.place_name, evt.payload.field_index);
  } else if (is_Enter_spot(evt) || is_Birth_gate_select(evt)) {
    go_to_spot(evt.payload.place_name);
  } else if (is_Present_cards(evt)) {
    present_cards(evt.payload.cards, evt.payload.set, evt.payload.on_select);
  } else if (is_End_game(evt)) {
    go_to_spot(world_center);
    get_controls_scene().scene.sendToBack();
  } else if (is_Present_avatars(evt)) {
    present_avatars(evt.payload.on_select);
  } else if (is_Select_player(evt)) {
    set_player_deck(evt.payload.card_set);
    get_main_scene().setup_avatar(evt.payload.card_set);
  } else if (is_Pick_cards(evt)) {
    present_cards(evt.payload.cards, evt.payload.set, () => {});
  } else if (is_Recap_game(evt)) {
    recap_game();
  }
  evt.processed = true;
  update_guide();
}

export function restore_game(history: Game_event[], { cards, set, cursor }: { cards: string[], set: CARD_SET, cursor: number }) {
  get_card_scene().switch_off();
  if (is_Present_cards(history.at(-1))) {
    history.pop();
  }
  hist.length = 0;
  hist.push(...history);
  get_main_scene().setup_avatar(set);
  seen_i = hist.length;
  const last_location = get_current_position(history.at(-1));
  const last_coord = get_coord(last_location.place_name, last_location.field_index);
  get_main_scene().instant_move_avatar(last_coord);
  const drawn_cards_scene = get_drawn_cards_scene();
  for (let i = 0; i < history.length; i++) {
    const evt = history[i];
    if (is_Draw_event(evt)) {
      if (is_Select_from_presented_cards(evt)) {
        drawn_cards_scene.add_card(evt.payload.card/*, { load: true }*/);
      } else if (is_Pick_cards(evt)) {
        const { cards, set } = evt.payload;
        const global_cards = cards.map((card: Card) => ({ id: card, set }));
        global_cards.forEach((card: GlobalCard) => drawn_cards_scene.add_card(card/*, { load: true })*/));
      } else {
        console.error('Unexpected draw event', evt);
      }
    }
  }
  restore_player_deck(set, cards, cursor);
}

function go_to_spot(spot_name: Spot_name) {
  const spot_coord = Coords.spots[spot_name];
  get_main_scene().move_avatar(spot_coord);
}

function go_to_field(road_name: Road_name, field_index: number) {
  const road = Coords.roads[road_name];
  const field_coord = road[field_index];
  get_main_scene().move_avatar(field_coord);
}

function present_cards(cards: Card[], set: CARD_SET | CROSSROAD_CARD_SET, on_select: (card: GlobalCard) => void) {
  get_card_scene().show_cards(cards.map(card => ({ id: card, set }))).then(on_select);
}

function present_avatars(on_select: (set: CARD_SET) => void) {
  get_card_scene().show_avatars().then(on_select);
}
