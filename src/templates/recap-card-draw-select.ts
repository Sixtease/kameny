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
  is_Enter_spot,
  is_Game_event,
  is_Present_cards,
} from '../game/events';
import { get_current_place } from '../game/logic';
import {
  is_crossroad,
  is_teleport,
  place_language_expression,
  road_connects,
} from '../game/place_info';
import card_meta from '../constants/card_meta.json';
import { birth_gate_names } from '../constants/guide';
import { Grammatical_case } from '../constants/lingua';

interface Card_draw_select_props {
  draw_event: Select_from_presented_cards;
}

interface Wording {
  from_these_cards: string;
  you_picked: string;
  by_which: string;
}
const default_wording: Wording = {
  from_these_cards: 'Z těchto karet:',
  you_picked: 'sis vybral tuto.',
  by_which: '',
};

const get_wording = (draw_event: Select_from_presented_cards): Wording => {
  const next_event = find_event_forward(is_Game_event, draw_event);
  if (!next_event) {
    return default_wording;
  }
  const drawing_place = get_current_place(draw_event);
  if (drawing_place === world_center && is_Birth_gate_select(next_event)) {
    const gate_id = next_event.payload.place_name;
    const gate_name = birth_gate_names[gate_id];
    const gate_number = gate_id.match(/\d+/)![0];
    return {
      from_these_cards: 'Při volbě brány zrození sis z těchto karet:',
      you_picked: 'vybral tuto:',
      by_which: `Tím's vstoupil do brány č. ${gate_number} „${gate_name}“.`,
    };
  }
  if (is_crossroad(drawing_place) && is_Enter_road(next_event)) {
    const starting_crossroad_lang = place_language_expression(drawing_place)(Grammatical_case.locative);
    const road_name = next_event.payload.place_name;
    const road_connection = road_connects(road_name, drawing_place);
    const other_road_end_lang = place_language_expression(road_connection.destination)(Grammatical_case.dative);
    const to_lang = /^k/.test(other_road_end_lang) ? 'ke' : 'k';
    return {
      from_these_cards: `Na ${starting_crossroad_lang} sis z těchto karet:`,
      you_picked: 'vybral tuto:',
      by_which: `Tím ses vydal směrem ${to_lang} ${other_road_end_lang}.`,
    };
  }
  if (is_teleport(drawing_place) && is_Enter_spot(next_event)) {
    const starting_teleport = drawing_place;
    const starting_teleport_lang = place_language_expression(drawing_place)(Grammatical_case.locative);
    const destination_teleport = next_event.payload.place_name;
    const destination_teleport_lang_fn = place_language_expression(destination_teleport);
    if (starting_teleport === destination_teleport) {
    return {
      from_these_cards: `Na ${starting_teleport_lang} sis z těchto karet:`,
      you_picked: 'vybral tuto:',
      by_which: `a zůstal's tak na ${destination_teleport_lang_fn(Grammatical_case.locative)}.`,
    };
    }
    return {
      from_these_cards: `Na ${starting_teleport_lang} sis z těchto karet:`,
      you_picked: 'vybral tuto:',
      by_which: `Tím ses přemístil na ${destination_teleport_lang_fn(Grammatical_case.accusative)}.`,
    };
  }
  return default_wording;
};

const html = htm.bind(h);

export class Card_draw_select extends Component<Card_draw_select_props> {
  render({ draw_event }: Card_draw_select_props) {
    const offer_event = find_event_backward(is_Present_cards, draw_event) as Present_cards;
    const { id: picked, set } = draw_event.payload.card;
    const picked_meta = card_meta[picked];
    const offer = offer_event.payload.cards;
    const {
      from_these_cards,
      you_picked,
      by_which,
    } = get_wording(draw_event);
    return html`
      <div class="recap-card-offer">
        <p>${from_these_cards}</p>
        <ul>
          ${offer.map((card: Card) => html`
            <li key=${card}><img src="assets/cards/${set}/${card}.jpg" alt="" />${card_meta[card].name_cs}</li>
          `)}
        </ul>
      </div>
      <div class="recap-picked-card">
        <p>${you_picked}</p>
        <img src="assets/cards/${set}/${picked}.jpg" alt="" />${picked_meta.name_cs}
        <p class="recap-exegesis">${picked_meta.exegesis}.</p>
        ${by_which}
      </div>
    `;
  }
}

