import { h, Component, render } from 'preact';
import htm from 'htm';

import { init_guide } from '../guide/init';
import { Overlay } from './overlay';

const html = htm.bind(h);

class Game_intro extends Component {
  render() {
    return html`
      <${Overlay}>
        <div class="recap-root game-intro">
          <p>Před hrou proveď vnitřní přípravu.</p>
          <p>„Proč je pro mě tento svět důležitý, abych se do něj narodil a začal hru?“</p>
          <p>Uveď se do stavu meditace na tuto otázku a můžeš</p>
          <p>
            <button
              onClick=${
                () => {
                  document.getElementById('preact-root').classList.remove('recap-shown');
                  init_guide();
                }
              }
              onMouseUp=${(evt) => {
                evt.preventDefault();
              }}
            >Hrát</button>
          </p>
        </div>
      </Overlay>
    `;
  }
}

export const game_intro = () => {
  const root = document.getElementById('preact-root');
  render(
    html`<${Game_intro } />`,
    root
  );
  root.classList.add('recap-shown');
};
