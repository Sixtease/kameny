import * as Places from '../constants/places';
import { DIRECTION, is_road, is_spot, road_connects, get_road_length } from './place_info';
import { transitions } from './transition';

enum AVATAR_STATE {
  BORN = 'BORN',
  AT_FIELD = 'AT_FIELD',
  DIED = 'DIED',
}

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
export const hist: Game_event[] = [];
function add_evt<T extends Game_event>(e: T): T {
  hist.push(e);
  return e;
};

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
    if (is_Movement_event(evt)) {
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
    } else if (is_Field_progress(evt)) {
      if (field_index !== undefined) {
        continue;
      }
      if (evt.payload.direction === DIRECTION.FORWARD) {
        field_index = evt.payload.field_index + 1;
      } else {
        field_index = evt.payload.field_index - 1;
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

function go_to_start_gate(): Game_event {
  const rand = 6.1 * Math.random();
  const gate_index = Math.floor(rand);
  const gate_name = Places.gates[gate_index];
  return add_evt<Birth_gate_select>({
    evt_name: 'Birth_gate_select',
    processed: false,
    payload: {
      place_name: gate_name,
    },
  });
};


function select_place(candidate_places: Places.Place_name[]): Places.Place_name {
  const selected_place = candidate_places[Math.floor(candidate_places.length * Math.random())];
  add_evt<Select_place>({
    evt_name: 'Select_place',
    processed: false,
    payload: {
      candidate_places,
      selected_place,
    },
  })
  return selected_place;
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

export function avatar_step(): Game_event | null {
  const previous_place = get_previous_place();
  if (previous_place === null) {
    return go_to_start_gate();
  }
  const current_place = get_current_place();
  if (is_road(current_place)) {
    const went_to_next_field = go_to_next_field();
    if (went_to_next_field !== null) {
      return went_to_next_field;
    }
  }
  const candidate_places = transitions(current_place, previous_place);
  const selected_place = select_place(candidate_places);
  return go_to_place(selected_place);
}
