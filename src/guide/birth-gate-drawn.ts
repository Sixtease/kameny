import { h, Component, render } from 'preact';
import htm from 'htm';

import { birth_gate_names } from '../constants/guide';
import { Birth_gate_select, find_event_backward, is_Birth_gate_select } from '../game/events';

const html = htm.bind(h);

export class Birth_gate_drawn extends Component<{}> {
  render() {
    const birth_gate_select_evt = find_event_backward<Birth_gate_select>(is_Birth_gate_select);
    const gate_id = birth_gate_select_evt.payload.place_name;
    const gate_name = birth_gate_names[gate_id];

    return html`
      <div class="guide-page guide-page--birth-gate-selected">
        <p>
          Pro vstup do světa sis vybral bránu
        </p>
        <p>
          <strong>${gate_name}</strong>.
        </p>
      </div>
    `;
  }
}

export const birth_gate_drawn = () => {
  render(
    html`<${Birth_gate_drawn} />`,
    document.getElementById('guide-root')
  );
  document.getElementById('guide-container').classList.add('guide-on');
};

