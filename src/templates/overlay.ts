import { h, Component } from 'preact';
import htm from 'htm';

import { event_occurred } from '../game/events';

interface OverlayProps {
  on_close: () => void;
  on_back?: () => void;
}

const html = htm.bind(h);

export class Overlay extends Component<OverlayProps> {
  render({ children, on_back, on_close }) {
    return html`
      <div
        class="recap-overlay"
        onMouseDown=${(evt) => evt.stopPropagation()}
        onMouseUp=${(evt) => evt.stopPropagation()}
      >
        ${
          on_back && (
            html`<div
              title="Zpět"
              class="recap-back-button"
              onClick=${on_back}
            >←</div>`
          )
        }
        ${
          on_close && (
            html`<div
              class="recap-close-button"
              title="Zavřít"
              onClick=${
                () => {
                  if (event_occurred('End_game')) location.reload();
                  document.getElementById('preact-root').classList.remove('recap-shown');
                  on_close();
                }
              }
            >×</div>`
          )
        }
        ${children}
      </div>
    `;
  }
}
