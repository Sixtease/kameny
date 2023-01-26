import { h, Component, render } from 'preact';
import htm from 'htm';

import { Overlay } from './overlay';
import { recap_last_card_draw } from './recap-card-draw';

const html = htm.bind(h);

class Recap_game extends Component {
  render() {
    return html`
      <${Overlay} onClose=${() => this.setState({ draw_event: null })}>
        <div class="recap-root recap-game">
          <p>Hra skončila.</p>
          <p>
            <a href="javascript:;" onClick=${() => recap_last_card_draw()}>Rekapitulovat.</a>
            <a href="javascript:location.reload()">Hrát znovu.</a>
          </p>
        </div>
      </Overlay>
    `;
  }
}

export const recap_game = () => {
  const root = document.getElementById('preact-root');
  render(
    html`<${Recap_game } />`,
    root
  );
  root.classList.add('recap-shown');
};
