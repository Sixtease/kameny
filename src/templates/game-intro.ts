import { h, Component, render } from 'preact';
import htm from 'htm';

import { Overlay } from './overlay';

const html = htm.bind(h);

class Game_intro extends Component {
  render() {
    return html`
      <${Overlay}>
        <div class="recap-root game-intro">
          <p>Projdi hracím polem a po cestě nacházej karty.</p>
          <p>Na křižovtkách si výběrem karty určuješ další směr.</p>
          <p>Na každou kartu se dobře soustřeď: Poselství v nich ukryté je to hlavní, co ti hra dá.</p>
          <p>Krok po hracím poli uděláš kliknutím na svůj hrací kámen.</p>
          <p>
            <button
              onClick=${
                () => {
                  document.getElementById('preact-root').classList.remove('recap-shown');
                }
              }
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
