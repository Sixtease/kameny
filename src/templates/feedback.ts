import { h, Component, render } from 'preact';
import htm from 'htm';

import { clear_saved_game } from '../game/manage';
import { Overlay } from './overlay';
import { recap_game } from './recap-game';

const html = htm.bind(h);

interface Feedback_props {
  request_interpretation: boolean;
  order_board_game: boolean;
}

class User_feedback extends Component<Feedback_props> {
  render({ request_interpretation, order_board_game }: Feedback_props) {

    return html`
      <${Overlay}>
        <div class="recap-root user-feedback">
          <form action="https://kameny.life/feedback.php" method="post" target="_blank">
            <input type="hidden" name="game_ref" value="${localStorage.getItem('saved_game_ref')}" />

            <section>
              <h2>Objednat:</h2>

              <label class="buttonlike">
                <input type="checkbox" name="request_interpretation" value="1" checked=${request_interpretation} />
                výklad průběhu hry od autorky
              </label>

              <label class="buttonlike">
                <input type="checkbox" name="order_board_game" value="1" checked=${order_board_game} />
                deskovou verzi hry
              </label>
            </section>

            <section>
              <label>tvůj e-mail <input type="email" name="email" required></label>
            </section>

            <section>
              <label>
                Chceš něco dodat?
                <br />
                <textarea name="message"></textarea>
              </label>
            </section>

            <button type="submit">Odeslat</button>
          </form>
          <p class="recap-game__footer">
            <button type="button" onClick=${() => { clear_saved_game(); location.reload(); }}>Hrát znovu</button>
            <button type="button" onClick=${recap_game}>Zpět k rekapitulaci</button>
          </p>
        </div>
      </Overlay>
    `;
  }
}

export const order_board_game = () => {
  const root = document.getElementById('preact-root');
  render(
    html`<${User_feedback} order_board_game />`,
    root
  );
  root.classList.add('recap-shown');
};

export const request_interpretation = () => {
  const root = document.getElementById('preact-root');
  render(
    html`<${User_feedback} request_interpretation />`,
    root
  );
  root.classList.add('recap-shown');
};
