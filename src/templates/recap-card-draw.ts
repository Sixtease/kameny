import { h, Component, render } from 'preact';
import htm from 'htm';

import { CARD_SET, Card } from '../constants/cards';
import { Game_event, Present_cards, Select_from_presented_cards, event_occurred } from '../game/events';
import { Overlay } from './overlay';

interface Card_draw_state {
  draw_event: Select_from_presented_cards;
}
interface Card_draw_props extends Card_draw_state {
  set: CARD_SET;
}

const html = htm.bind(h);

class Card_draw extends Component<Card_draw_props> {
  state: Card_draw_state;

  render(props, state) {
    const draw_event: Select_from_presented_cards = state.draw_event || props.draw_event;
    const prev_draw_event = event_occurred('Select_from_presented_cards', draw_event)
    const offer_event = event_occurred('Present_cards', draw_event) as Present_cards;
    const { id: picked, set } = draw_event.payload.card;
    const offer = offer_event.payload.cards;
    return html`
      <${Overlay}>
        <div class="recap-root">
          <p>Z těchto karet:</p>
          ${ prev_draw_event
            ? html`<a class="recap-link recap-link-left" onClick=${() => this.setState({ ...this.state, draw_event: prev_draw_event })}>˂ předchozí</a>` 
            : null
          }
          <ul class="recap-card-offer">
            ${offer.map((card: Card) => html`
              <li key=${card}><img src="assets/cards/${set}/${card}.jpg" alt="" />${card}</li>
            `)}
          </ul>
          <p class="recap-picked-card">sis vybral tuto: <img src="assets/cards/${set}/${picked}.jpg" alt="" />${picked}</p>
        </div>
      </Overlay>
    `;
  }
}

export const recap_last_card_draw = (evt?: Game_event) => {
  const draw_event = event_occurred('Select_from_presented_cards', evt) as Select_from_presented_cards;
  const root = document.getElementById('preact-root');
  render(
    html`<${Card_draw } draw_event=${draw_event} />`,
    root
  );
  root.classList.add('recap-shown');
};
