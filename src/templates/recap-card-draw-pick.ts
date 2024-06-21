import { h, Component } from 'preact';
import htm from 'htm';

import { Card } from '../constants/cards';
import card_meta from '../constants/card_meta.json';
import { Grammatical_case } from '../constants/lingua';
import {
  Pick_cards,
} from '../game/events';
import { get_current_place } from '../game/logic';
import { is_crossroad, place_language_expression } from '../game/place_info';

interface Card_draw_pick_props {
  draw_event: Pick_cards;
}

const html = htm.bind(h);

export class Card_draw_pick extends Component<Card_draw_pick_props> {
  render({ draw_event }: Card_draw_pick_props) {
    const { cards, set } = draw_event.payload;
    if (cards.length === 1) {
      const [ card ] = cards;
      const { exegesis, name_cs } = card_meta[card];
      const drawing_place = get_current_place(draw_event);
      if (is_crossroad(drawing_place)) {
        return html`
          <div class="recap-card-offer recap-card-offer-single">
            <p class="recap-picked-card">
              Dostal's tuto kartu náležící ke ${place_language_expression(drawing_place, Grammatical_case.dative)}:
              <img src="assets/cards/${set}/${card}.jpg" alt="" />${name_cs}
            </p>
            <p class="card-detail-accompanying-text">${exegesis}</p>
          </div>
        `;
      }
      else {
        return html`
          <div class="recap-card-offer recap-card-offer-single">
            <p class="recap-picked-card">
              Dostal's tuto kartu:
              <img src="assets/cards/${set}/${card}.jpg" alt="" />${name_cs}
            </p>
            <p class="card-detail-accompanying-text">${exegesis}</p>
          </div>
        `;
      }
    }
    else {
      return html`
        <div class="recap-card-offer recap-card-offer-multiple">
          <p>Dostal's tyto karty:</p>
          <ul>
            ${cards.map((card: Card) => {
              const { exegesis, name_cs } = card_meta[card];
              return html`
                <li key=${card}><img src="assets/cards/${set}/${card}.jpg" alt="" />
                  ${name_cs}
                  <p class="card-detail-accompanying-text">${exegesis}</p>
                </li>
              `;
            })}
          </ul>
        </div>
      `;
    }
  }
}


