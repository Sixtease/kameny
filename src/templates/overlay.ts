import { h, Component } from 'preact';
import htm from 'htm';

import { event_occurred } from '../game/events';

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
              if (event_occurred('End_game')) location.reload();
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
