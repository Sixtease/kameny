import { h, Component, render } from 'preact';
import htm from 'htm';
import { Overlay } from './overlay';
import { load_game, clear_saved_game, check_saved_game } from '../game';

const html = htm.bind(h);

function close() {
  document.getElementById('preact-root').classList.remove('recap-shown');
}

class Offer_load_game extends Component {
  render() {
    return html`
      <${Overlay}>
        <div class="offer-load-game">
          <button onClick=${() => { load_game(); close(); }}>Pokračovat v předchozí hře</button>
          <button onClick=${() => { clear_saved_game(); close(); }}>Začít novou hru</button>
        </div>
      </Overlay>
    `;
  }
}

export const offer_load_game = () => {
  if (!check_saved_game()) { return false; }
  const root = document.getElementById('preact-root');
  render(
    html`<${Offer_load_game} />`,
    root
  );
  root.classList.add('recap-shown');
  return true;
};

