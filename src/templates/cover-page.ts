import { h, Component, render } from 'preact';
import htm from 'htm';

import { second } from '../constants';
import { game_intro as next } from './game-intro';
import { Overlay } from './overlay';

interface Cover_page_props {
  green_to_go: boolean;
}

interface Cover_page_state {
  phase: number;
}

const stati = [
  { duration: 2, line: 'inicializuji' },
  { duration: 3, line: 'nahrávám' },
  { duration: 1, line: 'spouštím' },
];

const html = htm.bind(h);

class Cover_page extends Component<Cover_page_props> {
  state: Cover_page_state = {
    phase: 0,
  }

  render({ green_to_go }: Cover_page_props) {
    const { phase } = this.state;
    if (!stati[phase] && green_to_go) {
      next();
      return null;
    }

    const { duration, line } = stati[phase];
    if (stati[phase + 1] || green_to_go) {
      setTimeout(
        () => this.setState({ phase: phase + 1 }),
        duration * second
      );
    }

    return html`
      <${Overlay}>
        <div class="cover-page">
          <div class="cover-page__text">
            <h1>Moudrost <span>v síle kamenů</span></h1>
            <h2 class="author">Jiřina Lockerová</h2>
            <h2 class="subtitle">sebepoznávací hra</h2>
            <div class="status-line">
              <output>${line}...</output>
            </div>
          </div>
        </div>
      </Overlay>
    `;
  }
}

export const cover_page = () => {
  const root = document.getElementById('preact-root');
  render(
    html`<${Cover_page} status_line="nahrávám" green_to_go />`,
    root
  );
  root.classList.add('recap-shown');
};
