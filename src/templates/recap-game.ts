import { h, Component, render } from 'preact';
import htm from 'htm';

import card_meta from '../constants/card_meta.json';
import { Card } from '../constants/cards';
import { avatar_names, birth_gate_name_list, death_gate_name_list } from '../constants/guide';
import { Gate_name, gates } from '../constants/places';
import { get_player_deck } from '../game';
import {
  Game_event,
  find_event_forward,
  find_event_backward,
  hist,
  is_Birth_gate_select,
  is_End_game,
  is_Enter_spot,
  is_Pick_cards,
  is_Select_from_presented_cards,
} from '../game/events';
import { clear_saved_game } from '../game/manage';
import { Overlay } from './overlay';
import { recap_last_card_draw } from './recap-card-draw';

const html = htm.bind(h);

function get_gate_info(place_name: Gate_name, gate_name_list: string[]): { number: number, name: string } {
  const index = gates.indexOf(place_name);
  const number = index + 1;
  const name = gate_name_list[index];
  return { number, name };
}

function get_acquired_cards(): { evt: Game_event, card: Card, name: string, path: string }[] {
  const acs: { evt: Game_event, card: Card, name: string, path: string }[] = [];
  hist.forEach((evt: Game_event) => {
    if (is_Pick_cards(evt)) {
      const { cards, set } = evt.payload;
      console.log('pick cards', evt, cards, set);
      acs.push(...cards.map(card => {
        const { name_cs } = card_meta[card];
        return { evt, card, name: name_cs, path: `assets/cards/${set}/${card}.jpg` };
      }));
    }
    if (is_Select_from_presented_cards(evt)) {
      const card = evt.payload.card;
      const { name_cs } = card_meta[card.id];
      acs.push({
        evt,
        card: card.id,
        name: name_cs,
        path: `assets/cards/${card.set}/${card.id}.jpg`,
      });
    }
  });
  return acs;
}

class Recap_game extends Component {
  render() {
    const deck = get_player_deck();

    const birth_gate_select_event = find_event_forward(is_Birth_gate_select);
    const birth_gate_place_name = birth_gate_select_event.payload.place_name;
    const birth_gate = get_gate_info(birth_gate_place_name, birth_gate_name_list);

    const end_game_event = find_event_backward(is_End_game);
    const end_gate_enter_event = find_event_backward(is_Enter_spot, end_game_event);
    const end_gate_place_name = end_gate_enter_event.payload.place_name as Gate_name;
    const end_gate = get_gate_info(end_gate_place_name, death_gate_name_list);

    const acquired_cards = get_acquired_cards();

    return html`
      <${Overlay}>
        <div class="recap-root recap-game">
          <h2>Rekapitulace hry</h2>

          <dl class="recap-game__gate recap-game__birth-gate">
            <dt>Brána odhodlání</dt>
            <dd>${birth_gate.number}: ${birth_gate.name}</dd>
          </dl>
          <div class="recap-game__avatar">
            <img src="assets/avatars/${deck.set}.png" />
            <p>${avatar_names[deck.set]}</p>
          </div>
          <dl class="recap-game__gate recap-game__end-gate">
            <dt>Brána pochopení</dt>
            <dd>${end_gate.number}: ${end_gate.name}</dd>
          </dl>

          <img class="recap-game__card-binding recap-game__card-binding--down" src="assets/ui/gate-arrow-down.svg" />
          <img class="recap-game__card-binding recap-game__card-binding--up" src="assets/ui/gate-arrow-up.svg" />

          <div class="recap-game__cards">
            ${acquired_cards.map(({ evt, name, path }) => html`
              <span><img src="${path}" title="${name}" onClick=${() => recap_last_card_draw(evt)} /></span>
            `)}
          </div>

          <div class="recap-game__minimap">
            <img src="assets/world.jpg" />
          </div>
          <p class="recap-game__footer">
            <a href="javascript:;" onClick=${recap_last_card_draw}>Rekapitulovat.</a>
            <a href="javascript:;" onClick=${() => { clear_saved_game(); location.reload(); }}>Hrát znovu.</a>
          </p>
        </div>
      </Overlay>
    `;
  }
}

export const recap_game = () => {
  const root = document.getElementById('preact-root');
  render(
    html`<${Recap_game} />`,
    root
  );
  root.classList.add('recap-shown');
};
