import { h, Component, render } from 'preact';
import htm from 'htm';

import { Card } from '../constants/cards';
import card_meta from '../constants/card_meta.json';
import { Grammatical_case } from '../constants/lingua';
import {
  Enter_road,
  Field_progress,
  find_event_backward,
  Game_event,
  is_Enter_road,
  is_Field_progress,
  Pick_cards,
} from '../game/events';
import { get_current_place } from '../game/logic';
import { DIRECTION, is_crossroad, place_language_expression, road_language_expression } from '../game/place_info';
import { Road_name } from '../constants/places';
import { recapping_card_detail } from './card-detail';
import { Picked_card_list } from './pick-cards';
import { recap_last_card_draw } from './recap-card-draw';

interface Card_draw_pick_props {
  draw_event: Pick_cards;
}

const html = htm.bind(h);

export class Card_draw_pick extends Component<Card_draw_pick_props> {
  render({ draw_event }: Card_draw_pick_props) {
    const { cards, set } = draw_event.payload;
    const return_from_detail = () => {
      recap_last_card_draw(draw_event);
    };
    if (cards.length === 1) {
      const [card] = cards;
      const { exegesis, name_cs } = card_meta[card];
      const drawing_place = get_current_place(draw_event);
      const url = `assets/cards/${set}/${card}.jpg`;
      if (is_crossroad(drawing_place)) {
        return html`
          <div>
            <p class="recap-picked-card">
              Dostáváš tuto kartu náležící ke ${place_language_expression(drawing_place)(Grammatical_case.dative)}:
              <div>
                <a onClick=${() => recapping_card_detail({ card_id: card, url, return_from_detail })}>
                  <img src="${url}" alt="" />
                </a>
              </div>
              ${name_cs}
            </p>
            <p class="card-detail-accompanying-text">${exegesis}</p>
          </div>
        `;
      }
      else {
        const get_direction_stating_event = (evt: Game_event): evt is (Enter_road | Field_progress) => is_Enter_road(evt) || is_Field_progress(evt);
        const direction_stating_event = find_event_backward(get_direction_stating_event, draw_event);
        const direction = direction_stating_event ? direction_stating_event.payload.direction : DIRECTION.FORWARD
        return html`
          <div>
            <p class="recap-picked-card">
              Na ${road_language_expression(drawing_place as Road_name, direction, Grammatical_case.locative)} dostáváš tuto kartu:
              <div>
                <a onClick=${() => recapping_card_detail({ card_id: card, url, return_from_detail })}>
                  <img src="assets/cards/${set}/${card}.jpg" alt="" />
                </a>
              </div>
              ${name_cs}
            </p>
            <p class="card-detail-accompanying-text">${exegesis}</p>
          </div>
        `;
      }
    }
    else {
      const cards_render_info = cards.map((card: Card) => {
        const { exegesis, name_cs } = card_meta[card];
        const url = `assets/cards/${set}/${card}.jpg`;
        return {
          card_id: card,
          exegesis,
          name_cs,
          url,
        };
      });
      return html`
        <${Picked_card_list}
          cards=${cards_render_info}
          return_from_detail=${return_from_detail}
        />
      `;
    }
  }
}

export const card_draw_pick = ({ draw_event }: Card_draw_pick_props) => {
  const root = document.getElementById('preact-root');
  render(
    html`<${Card_draw_pick} draw_event=${draw_event} />`,
    root
  );
  root.classList.add('recap-shown');
};
