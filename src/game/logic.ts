import * as Places from '../constants/places';
import { DIRECTION, is_road, is_spot, road_connects, get_road_length } from './place_info';
import { transitions } from './transition';
import { get_player_deck } from '../game';
import { CARD_SET, Card, GlobalCard } from '../constants/cards';
import {
  Birth_gate_select,
  End_game,
  Enter_road,
  Enter_spot,
  Field_progress,
  Game_event,
  Movement_event,
  Present_cards,
  Select_place,
  Select_player,
  add_evt,
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

export function get_current_place(): Places.Place_name {
  for (let i = hist.length - 1; i >= 0; i--) {
    const evt = hist[i];
    if (is_Movement_event(evt)) {
      return evt.payload.place_name;
    }
  }
  return Places.map_center;
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
  return saw_current_place ? Places.map_center : null;
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

function shift_cards(count: number): Card[] {
  return get_player_deck().draw(count);
}

function select_place(candidate_places: Places.Place_name[]): Promise<Places.Place_name> {
  if (candidate_places.length === 0) {
    add_evt<End_game>({
      evt_name: 'End_game',
      processed: false,
      payload: {},
    });
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
    add_evt<Present_cards>({
      evt_name: 'Present_cards',
      processed: false,
      payload: {
        cards,
        set: CARD_SET.mother,  // TODO: set set
        permutation: Array(candidate_places.length).map((_, i) => i).sort(Math.random),
        on_select: (selected_card: GlobalCard) => {
          const selected_card_index = cards.indexOf(selected_card.id);
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

export function avatar_step(): void {
  const previous_place = get_previous_place();
  if (previous_place === null) {
    select_place(Places.gates).then(selected_gate => go_to_start_gate(selected_gate as Places.Gate_name));
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

export function select_player(card_set: CARD_SET = CARD_SET.mother) {
  add_evt<Select_player>({
    evt_name: 'Select_player',
    processed: false,
    payload: { card_set },
  });
}
