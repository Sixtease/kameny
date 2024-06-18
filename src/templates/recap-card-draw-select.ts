import { h, Component } from 'preact';
import htm from 'htm';

import { Card } from '../constants/cards';
import { world_center } from '../constants/places';
import {
  Present_cards,
  Select_from_presented_cards,
  find_event_backward,
  find_event_forward,
  is_Birth_gate_select,
  is_Enter_road,
  is_Game_event,
  is_Present_cards,
} from '../game/events';
import { get_current_place } from '../game/logic';
import { is_crossroad, place_language_expression, road_connects } from '../game/place_info';
import card_meta from '../constants/card_meta.json';
import { birth_gate_names } from '../constants/guide';
import { Grammatical_case } from '../constants/lingua';

interface Card_draw_select_props {
  draw_event: Select_from_presented_cards;
}

const get_context = (draw_event: Select_from_presented_cards) => {
  const next_event = find_event_forward(is_Game_event, draw_event);
  if (!next_event) {
    return [null, null];
  }
  const drawing_place = get_current_place(draw_event);
  if (drawing_place === world_center && is_Birth_gate_select(next_event)) {
    const gate_id = next_event.payload.place_name;
    const gate_name = birth_gate_names[gate_id];
    return ['Při volbě brány odhodlání,', `Tím's vstoupil do brány ${gate_name}.`];
  }
  if (is_crossroad(drawing_place) && is_Enter_road(next_event)) {
    const starting_crossroad_lang = place_language_expression(drawing_place, Grammatical_case.dative);
    const road_name = next_event.payload.place_name;
    const road_connection = road_connects(road_name, drawing_place);
    const other_road_end_lang = place_language_expression(road_connection.destination, Grammatical_case.dative);
    return [`Na ${starting_crossroad_lang}`, `Tím ses vydal směrem ke ${other_road_end_lang}.`];
  }
  return [null, null];
};

const html = htm.bind(h);

export class Card_draw_select extends Component<Card_draw_select_props> {
  render({ draw_event }: Card_draw_select_props) {
    const offer_event = find_event_backward(is_Present_cards, draw_event) as Present_cards;
    const { id: picked, set } = draw_event.payload.card;
    const picked_meta = card_meta[picked];
    const offer = offer_event.payload.cards;
    const [context_pre, context_post] = get_context(draw_event);
    return html`
      <div class="recap-card-offer">
        <p>${context_pre} z těchto karet:</p>
        <ul>
          ${offer.map((card: Card) => html`
            <li key=${card}><img src="assets/cards/${set}/${card}.jpg" alt="" />${card_meta[card].name_cs}</li>
          `)}
        </ul>
      </div>
      <div class="recap-picked-card">
        <p>sis vybral tuto:</p>
        <img src="assets/cards/${set}/${picked}.jpg" alt="" />${picked_meta.name_cs}
        <p>${picked_meta.exegesis}.</p>
        ${context_post && html`<p>${context_post}</p>`}
      </div>
    `;
  }
}

