import { h, Component, render } from 'preact';

import { find_event_backward, Game_event, hist, is_Birth_gate_select, is_End_game, is_Landed, is_Pick_cards, is_Present_avatars, is_Present_cards, is_Select_player } from '../game/events';
import { is_crossroad, is_gate, is_teleport } from '../game/place_info';
import { get_current_place, get_previous_place } from '../game/logic';
import { transitions } from '../game/transition';
import { Avatar_choice } from './avatar-choice';
import { Birth_gate_draw } from './birth-gate-draw';
import { Birth_gate_drawn } from './birth-gate-drawn';
import { Card_pick } from './card-pick';
import { Exiting_world } from './exiting-world';
import { Game_over } from './game-over';
import { General } from './general';
import { On_crossroad } from './on-crossroad';
import { About_to_teleport, Just_teleported } from './on-teleport';
import { Prebirth } from './prebirth';

type ComponentConstructor = new () => Component<{}, {}>;

export const lookup_guide = (): ComponentConstructor => {
  if (hist.length === 0) {
    return General;
  }
  let last: Game_event = hist.at(-1);
  const current_place = get_current_place();
  if (is_Landed(last)) {
    last = hist.at(-2);
  }
  if (is_Pick_cards(last)) {
    if (is_crossroad(current_place)) {
      return On_crossroad;
    }
    return Card_pick;
  }
  if (is_Present_avatars(last)) {
    return Avatar_choice;
  }
  if (is_Select_player(last)) {
    return Prebirth;
  }
  if (is_teleport(current_place)) {
    const previous_place = get_previous_place();
    if (is_teleport(previous_place)) {
      return Just_teleported;
    } else {
      return About_to_teleport;
    }
  }
  if (is_Present_cards(last)) {
    if (is_Select_player(hist.at(-2))) {
      return Birth_gate_draw;
    }
    return On_crossroad;
  }
  if (is_Birth_gate_select(last)) {
    return Birth_gate_drawn;
  }
  if (is_gate(current_place)) {
    const previous_place = get_previous_place();
    const candidate_places = transitions(previous_place, current_place);
    if (candidate_places.length === 0) {
      return Exiting_world;
    }
  }
  if (find_event_backward(is_End_game)) {
    return Game_over;
  }
  return General;
}

export const update_guide = () => {
  const Guide = lookup_guide();
  render(
    h(Guide, {}),
    document.getElementById('guide-root')
  );
}
