import { h, Component, render } from 'preact';

import { Game_event, hist, is_Present_avatars, is_Present_cards, is_Select_player } from '../game/events';
import { Avatar_choice } from './avatar-choice';
import { Birth_gate_draw } from './birth-gate-draw';
import { General } from './general';

type ComponentConstructor = new () => Component<{}, {}>;

export const lookup_guide = (): ComponentConstructor => {
  if (hist.length === 0) {
    return General;
  }
  const last: Game_event = hist.at(-1);
  if (is_Present_avatars(last)) {
    return Avatar_choice;
  }
  if (is_Present_cards(last) && is_Select_player(hist.at(-2))) {
    return Birth_gate_draw;
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
