import { h, Component } from 'preact';
import htm from 'htm';

interface OverlayProps {
  on_close: () => boolean | void;
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
                  const proceedWithDefault = on_close();
                  if (proceedWithDefault !== false) document.getElementById('preact-root').classList.remove('recap-shown');
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
