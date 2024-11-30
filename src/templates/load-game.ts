import { h, Component, render } from 'preact';
import htm from 'htm';
import { game_intro } from './game-intro';
import { Overlay } from './overlay';
import { load_game, clear_saved_game, check_saved_game } from '../game/manage';

const html = htm.bind(h);

function close() {
  document.getElementById('preact-root').classList.remove('recap-shown');
}

function load() {
  load_game();
  close();
}

function start_new() {
  clear_saved_game();
  game_intro();
}

class Offer_load_game extends Component {
  render() {
    return html`
      <${Overlay}>
        <div class="offer-load-game">
          <button onClick=${load}>Pokračovat v předchozí hře</button>
          <button onClick=${start_new}>Začít novou hru</button>
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

