import { h, Component, render } from 'preact';
import htm from 'htm';

import { get_current_place } from '../game/logic';
import { birth_gate_names } from '../constants/guide';

const html = htm.bind(h);

export class Exiting_world extends Component<{}> {
  render() {
    const exit_gate = get_current_place();
    const exit_gate_name = birth_gate_names[exit_gate];

    return html`
      <div class="guide-page guide-page--exiting-world">
        <p>
          Tvoje pouť končí. Ze světa odcházíš branou
        </p>
        <p>
            <strong>${exit_gate_name}</strong>.
        </p>
      </div>
    `;
  }
}

export const exiting_world = () => {
  render(
    html`<${Exiting_world} />`,
    document.getElementById('guide-root')
  );
  document.getElementById('guide-container').classList.add('guide-on');
};

