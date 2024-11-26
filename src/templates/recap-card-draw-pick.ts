import { h, Component } from 'preact';
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
import { get_current_place, get_current_position } from '../game/logic';
import { DIRECTION, is_crossroad, place_language_expression, road_language_expression } from '../game/place_info';
import { Road_name } from '../constants/places';
import { Picked_card_list } from './pick-cards';

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
      const drawing_position = get_current_position();
      console.log('drawing_position', drawing_position);
      if (is_crossroad(drawing_place)) {
        return html`
          <div class="recap-card-offer recap-card-offer-single">
            <p class="recap-picked-card">
              Dostal's tuto kartu náležící ke ${place_language_expression(drawing_place)(Grammatical_case.dative)}:
              <img src="assets/cards/${set}/${card}.jpg" alt="" />${name_cs}
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
          <div class="recap-card-offer recap-card-offer-single">
            <p class="recap-picked-card">
              Na ${road_language_expression(drawing_place as Road_name, direction, Grammatical_case.locative)} jsi dostal tuto kartu:
              <img src="assets/cards/${set}/${card}.jpg" alt="" />${name_cs}
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
      return html`<${Picked_card_list} cards=${cards_render_info} />`;
    }
  }
}
