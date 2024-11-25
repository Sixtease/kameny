import { h, Component, render } from 'preact';
import htm from 'htm';

import { get_previous_place } from '../game/logic';
import { death_gate_names } from '../constants/guide';

const html = htm.bind(h);

export class Game_over extends Component<{}> {
  render() {
    const exit_gate = get_previous_place();
    const exit_gate_name = death_gate_names[exit_gate];

    return html`
      <div class="guide-page guide-page--exiting-world">
        <p>
          Tvoje pouť skončila. Ze světa's odešel branou
        </p>
        <p>
          <strong>${exit_gate_name}</strong>.
        </p>
      </div>
    `;
  }
}

export const game_over = () => {
  render(
    html`<${Game_over} />`,
    document.getElementById('guide-root')
  );
  document.getElementById('guide-container').classList.add('guide-on');
};
