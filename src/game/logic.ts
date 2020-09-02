enum AVATAR_STATE {
  BORN,
  AT_BIRTH_GATE,
  AT_FIELD,
  AT_EXIT_GATE,
  DIED,
};

export interface Game_event {
  evt_name: string;
  processed: boolean;
  payload: {};
}
export interface Birth_gate_select extends Game_event {
  evt_name: 'Birth_gate_select';
  payload: {
    gate_index: number;
  };
}
export interface Field_progress extends Game_event {
  evt_name: 'Field_progress';
  payload: {
    field_name: string;
  }
}
export const history: Game_event[] = [];
const add_evt = (e: Game_event) => {
  history.push(e);
};

// nahradit funkcí pro odvození stavu avatara na základě událostí
let avatar_state: AVATAR_STATE = AVATAR_STATE.BORN;
// přidat odvození aktuálního políčka

const go_to_start_gate = () => {
  const rand = 6.1 * Math.random();
  const gate_index = Math.floor(rand);
  const evt: Birth_gate_select = {
    evt_name: 'Birth_gate_select',
    processed: false,
    payload: {
      gate_index,
    },
  };
  add_evt(evt);
  return evt;
};

export function avatar_step(): Game_event {
  switch (avatar_state) {
    case AVATAR_STATE.BORN:
      return go_to_start_gate();
  }
}
