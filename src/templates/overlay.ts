import { h, Component } from 'preact';
import htm from 'htm';

interface OverlayProps {
  onClose: () => void;
}

const html = htm.bind(h);

export class Overlay extends Component<OverlayProps> {
  render({ children, onClose }) {
    return html`
      <div class="recap-overlay">
        <div
          class="recap-close-button"
          onClick=${
            () => {
              document.getElementById('preact-root').classList.remove('recap-shown');
              onClose();
            }
          }
        >×</div>
        ${children}
      </div>
    `;
  }
}
