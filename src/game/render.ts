import { Birth_gate_select, Game_event, history } from './logic';
import { gates } from '../constants/coords';
import { Main_scene } from '../scenes/Main_scene';
import { get_scene } from '../game';
let seen_i = 0;

export function process_events() {
  while (history[seen_i]) {
    process_event(history[seen_i++]);
  }
};

function process_event(evt: Game_event) {
  switch (evt.evt_name) {
    case 'birth_gate_select':
      go_to_birth_gate((evt as Birth_gate_select).payload.gate_index);
      break;
  }
  evt.processed = true;
}

function go_to_birth_gate(gate_index) {
  const gate_coord = gates[gate_index];
  get_scene().avatar_move.moveTo(gate_coord.x, gate_coord.y);
}
