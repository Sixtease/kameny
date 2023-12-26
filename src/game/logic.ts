import { crossroad_card_by_set, set_to_crossroad_set } from '../constants/crossroad-cards';
import * as Places from '../constants/places';
import { DIRECTION, get_coord, is_road, is_spot, road_connects, get_road_length } from './place_info';
import { transitions } from './transition';
import { get_player_deck } from '../game';
import { CARD_SET, GlobalCard, Single_set_cards } from '../constants/cards';
import {
  Birth_gate_select,
  End_game,
  Enter_road,
  Enter_spot,
  Field_progress,
  Game_event,
  Movement_event,
  Pick_cards,
  Present_avatars,
  Present_cards,
  Recap_game,
  Select_from_presented_cards,
  Select_place,
  Select_player,
  add_evt,
  event_occurred,
  hist,
  is_Enter_road,
  is_Field_progress,
  is_Movement_event,
} from './events';

enum AVATAR_STATE {
  BORN = 'BORN',
  AT_FIELD = 'AT_FIELD',
  DIED = 'DIED',
}

export function get_current_position(): { place_name: Places.Place_name, field_index: number} {
  for (let i = hist.length - 1; i >= 0; i--) {
    const evt = hist[i];
    if (is_Movement_event(evt)) {
      const { place_name }  = evt.payload;
      if (is_Field_progress(evt)) {
        return {
          place_name,
          field_index: evt.payload.field_index,
        };
      }
      if (is_Enter_road(evt)) {
        const road_length = get_road_length(place_name as Places.Road_name);
        const field_index = evt.payload.direction === 'FORWARD' ? 0 : road_length - 1;
        return {
          place_name,
          field_index,
        };
      }
      return {
        place_name,
        field_index: null,
      };
    }
  }
  return {
    place_name: Places.world_center,
    field_index: null
  };
}
export function get_current_place(): Places.Place_name {
  return get_current_position().place_name;
}
export function get_previous_place(): Places.Place_name | null {
  let saw_current_place = false;
  for (let i = hist.length - 1; i >= 0; i--) {
    const evt = hist[i];
    if (is_Movement_event(evt) && !is_Field_progress(evt)) {
      if (saw_current_place) {
        return evt.payload.place_name;
      } else {
        saw_current_place = true;
      }
    }
  }
  return saw_current_place ? Places.world_center : null;
}
export function go_to_next_field(): Field_progress | null {
  let field_index: number | undefined = undefined;
  let road_name: Places.Road_name | undefined = undefined;
  let direction: DIRECTION | undefined = undefined;
  for (let i = hist.length - 1; i >= 0; i--) {
    const evt = hist[i];
    if (is_Field_progress(evt)) {
      if (field_index !== undefined) {
        continue;
      }
      if (evt.payload.direction === DIRECTION.FORWARD) {
        field_index = evt.payload.field_index + 1;
      } else {
        field_index = evt.payload.field_index - 1;
      }
    } else if (is_Movement_event(evt)) {
      if (is_Enter_road(evt)) {
        if (field_index === undefined) {
          if (evt.payload.direction === DIRECTION.FORWARD) {
            field_index = evt.payload.field_index + 1;
          } else {
            field_index = evt.payload.field_index - 1;
          }
        }
        direction = evt.payload.direction;
        road_name = evt.payload.place_name;
        break;
      } else {
        return null;
      }
    }
  }
  if (field_index === undefined) {
    return null;
  }
  if (field_index < 0) {
    return null;
  }
  if (road_name === undefined || direction === undefined) {
    throw new Error('no road for next field');
  }
  const road_length = get_road_length(road_name);
  if (field_index >= road_length) {
    return null;
  }
  return add_evt<Field_progress>({
    evt_name: 'Field_progress',
    processed: false,
    payload: {
      direction,
      place_name: road_name,
      field_index,
    },
  });
}
export function get_avatar_state(): AVATAR_STATE {
  for (let i = hist.length - 1; i >= 0; i--) {
    const evt = hist[i];
    if (is_Movement_event(evt)) {
      return AVATAR_STATE.AT_FIELD;
    }
  }
  return AVATAR_STATE.BORN;
}

function go_to_start_gate(gate_name: Places.Gate_name): Game_event {
  return add_evt<Birth_gate_select>({
    evt_name: 'Birth_gate_select',
    processed: false,
    payload: {
      place_name: gate_name,
    },
  });
};

function shift_cards(count: number): Single_set_cards {
  return get_player_deck().draw(count) as Single_set_cards;
}

function select_place(candidate_places: Places.Place_name[]): Promise<Places.Place_name> {
  if (candidate_places.length === 0) {
    add_evt<End_game>({
      evt_name: 'End_game',
      processed: false,
      payload: {},
    });
    return Promise.resolve(Places.world_center);
  }
  if (candidate_places.length === 1) {
    const selected_place = candidate_places[0];
    add_evt<Select_place>({
      evt_name: 'Select_place',
      processed: false,
      payload: {
        candidate_places,
        selected_place,
      },
    })
    return Promise.resolve(selected_place);
  }
  const cards = shift_cards(candidate_places.length);
  return new Promise<Places.Place_name>((resolve) => {
    const { set } = get_player_deck();
    add_evt<Present_cards>({
      evt_name: 'Present_cards',
      processed: false,
      payload: {
        cards,
        set,
        permutation: Array(candidate_places.length).map((_, i) => i).sort(() => Math.random() - 0.5),
        on_select: (selected_card: GlobalCard) => {
          const selected_card_index = cards.indexOf(selected_card.id as never); // FIXME
          add_evt<Select_from_presented_cards>({
            evt_name: 'Select_from_presented_cards',
            processed: false,
            payload: {
              index: selected_card_index,
              card: selected_card,
            },
          });
          resolve(candidate_places[selected_card_index]);
        },
      }
    });
  });
}

function go_to_place(successor: Places.Place_name): Movement_event {
  const predecessor = get_current_place();
  if (is_road(successor)) {
    if (!is_spot(predecessor)) {
      throw new Error(`came to road ${successor} from non-spot ${predecessor}`);
    }
    const { direction } = road_connects(successor, predecessor);
    const field_index = direction === DIRECTION.FORWARD ? 0 : get_road_length(successor) - 1;
    return add_evt<Enter_road>({
      evt_name: 'Enter_road',
      processed: false,
      payload: {
        place_name: successor,
        field_index,
        direction,
      },
    });
  } else {
    return add_evt<Enter_spot>({
      evt_name: 'Enter_spot',
      processed: false,
      payload: {
        place_name: successor,
      },
    });
  }
}

export function land(): void {
  const pos = get_current_position();
  const coord = get_coord(pos.place_name, pos.field_index);
  const { set } = get_player_deck();
  const crossroad_card = crossroad_card_by_set[set][pos.place_name];
  if (coord.K) {
    add_evt<Pick_cards>({
      evt_name: 'Pick_cards',
      processed: false,
      payload: {
        cards: shift_cards(coord.K),
        set,
      },
    });
  } else if (crossroad_card) {
    add_evt<Pick_cards>({
      evt_name: 'Pick_cards',
      processed: false,
      payload: {
        cards: [crossroad_card],
        set: set_to_crossroad_set[set],
      },
    });
  } else if (pos.place_name === Places.world_center) {
    add_evt<Recap_game>({
      evt_name: 'Recap_game',
      processed: false,
      payload: {},
    });
  }
}

export function avatar_step(): void {
  if (event_occurred('End_game')) {
    return;
  }
  const previous_place = get_previous_place();
  if (previous_place === null) {
    const candidate_places = transitions(Places.world_center, previous_place);
    select_place(candidate_places).then(selected_gate => go_to_start_gate(selected_gate as Places.Gate_name));
    return;
  }
  const current_place = get_current_place();
  if (is_road(current_place)) {
    const went_to_next_field = go_to_next_field();
    if (went_to_next_field !== null) {
      return;
    }
  }
  const candidate_places = transitions(current_place, previous_place);
  select_place(candidate_places).then(selected_place => go_to_place(selected_place));
}

export function select_player() {
    add_evt<Present_avatars>({
      evt_name: 'Present_avatars',
      processed: false,
      payload: {
        on_select: (card_set: CARD_SET) => {
          add_evt<Select_player>({
            evt_name: 'Select_player',
            processed: false,
            payload: { card_set },
          });
        },
      }
    });
}
