import { h, Component } from 'preact';
import htm from 'htm';

import { Card } from '../constants/cards';
import {
  Pick_cards,
} from '../game/events';

interface Card_draw_pick_props {
  draw_event: Pick_cards;
}

const html = htm.bind(h);

export class Card_draw_pick extends Component<Card_draw_pick_props> {
  render({ draw_event }: Card_draw_pick_props) {
    const { cards, set } = draw_event.payload;
    if (cards.length === 1) {
      const [ card ] = cards;
      return html`
        <div class="recap-card-offer">
          <p class="recap-picked-card">
            Dostal's tuto kartu:
            <img src="assets/cards/${set}/${card}.jpg" alt="" />${card}
          </p>
        </div>
      `;
    }
    else {
      return html`
        <div class="recap-card-offer">
          <p>Dostal's tyto karty:</p>
          <ul>
            ${cards.map((card: Card) => html`
              <li key=${card}><img src="assets/cards/${set}/${card}.jpg" alt="" />${card}</li>
            `)}
          </ul>
        </div>
      `;
    }
  }
}


