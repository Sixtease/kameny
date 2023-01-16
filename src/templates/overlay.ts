import { h, Component } from 'preact';
import htm from 'htm';

const html = htm.bind(h);

export class Overlay extends Component {
  render({ children }) {
    return html`
      <div class="recap-overlay">
        <div
          class="recap-close-button"
          onClick=${
            () => document.getElementById('preact-root').classList.remove('recap-shown')
          }
        >×</div>
        ${children}
      </div>
    `;
  }
}
