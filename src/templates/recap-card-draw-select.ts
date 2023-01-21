import { h, Component } from 'preact';
import htm from 'htm';

import { Card } from '../constants/cards';
import {
  Present_cards,
  Select_from_presented_cards,
  find_event_backward,
  is_Present_cards,
} from '../game/events';

interface Card_draw_select_props {
  draw_event: Select_from_presented_cards;
}

const html = htm.bind(h);

export class Card_draw_select extends Component<Card_draw_select_props> {
  render({ draw_event }: Card_draw_select_props) {
    const offer_event = find_event_backward(is_Present_cards, draw_event) as Present_cards;
    const { id: picked, set } = draw_event.payload.card;
    const offer = offer_event.payload.cards;
    return html`
      <div class="recap-card-offer">
        <p>Z těchto karet:</p>
        <ul>
          ${offer.map((card: Card) => html`
            <li key=${card}><img src="assets/cards/${set}/${card}.jpg" alt="" />${card}</li>
          `)}
        </ul>
      </div>
      <p class="recap-picked-card">sis vybral tuto: <img src="assets/cards/${set}/${picked}.jpg" alt="" />${picked}</p>
    `;
  }
}

