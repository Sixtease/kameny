import { h, Component, render } from 'preact';
import htm from 'htm';

import { start_guide } from '../guide/init';
import { Overlay } from './overlay';

const html = htm.bind(h);

class Game_intro extends Component {
  render() {
    return html`
      <${Overlay}>
        <div class="recap-root game-intro">
          <p>Před hrou proveď vnitřní přípravu.</p>
          <p>„Proč je pro mě tento svět důležitý, abych se do něj narodil a začal hru?“</p>
          <p>„Jaká výzva a podpora ke mně přichází v mé aktuální situaci života, v této fázi duchovní cesty, mého stavu?“</p>
          <p>Uveď se do stavu meditace na jednu z těchto otázek a můžeš</p>
          <p>
            <button
              onClick=${
                () => {
                  document.getElementById('preact-root').classList.remove('recap-shown');
                  start_guide();
                }
              }
              onMouseUp=${(evt) => {
                evt.preventDefault();
              }}
            >hrát</button>
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
