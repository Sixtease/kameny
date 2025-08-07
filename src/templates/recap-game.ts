import { h, Component, render } from 'preact';
import htm from 'htm';

import { world_height, world_width } from '../constants';
import card_meta from '../constants/card_meta.json';
import { Card } from '../constants/cards';
import { Coord } from '../constants/coords';
import { avatar_names, birth_gate_name_list, death_gate_name_list } from '../constants/guide';
import { Gate_name, gates, world_center } from '../constants/places';
import { get_player_deck } from '../game';
import {
  Field_progress,
  Game_event,
  find_event_forward,
  find_event_backward,
  hist,
  is_Birth_gate_select,
  is_End_game,
  is_Enter_spot,
  is_Pick_cards,
  is_Select_from_presented_cards,
  is_movement_event,
} from '../game/events';
import { clear_saved_game } from '../game/manage';
import { get_coord } from '../game/place_info';
import { Overlay } from './overlay';
import { recap_last_card_draw } from './recap-card-draw';
import { order_board_game, request_interpretation } from './feedback';

const html = htm.bind(h);

function get_gate_info(place_name: Gate_name, gate_name_list: string[]): { number: number, name: string } {
  const index = gates.indexOf(place_name);
  const number = index + 1;
  const name = gate_name_list[index];
  return { number, name };
}

interface Acquired_card {
  evt: Game_event;
  card: Card;
  coord: Coord;
  name: string;
  path: string;
  coord_list_index: number;
}

function get_visited(): { acquired_cards: Acquired_card[], visited_coords: Coord[] } {
  const acs: Acquired_card[] = [];
  const coords: Coord[] = [ get_coord(world_center, null) ];
  hist.forEach((evt: Game_event) => {
    if (is_movement_event(evt)) {
      coords.push(get_coord(evt.payload.place_name, (evt as Field_progress).payload.field_index));
    }
    const coord = coords.at(-1);
    if (is_Pick_cards(evt)) {
      const { cards, set } = evt.payload;
      acs.push(...cards.map(card => {
        const { name_cs } = card_meta[card];
        return {
          evt,
          card,
          coord,
          coord_list_index: coords.length - 1,
          name: name_cs,
          path: `assets/cards/${set}/${card}.jpg`,
        };
      }));
    }
    if (is_Select_from_presented_cards(evt)) {
      const card = evt.payload.card;
      const { name_cs } = card_meta[card.id];
      acs.push({
        evt,
        card: card.id,
        coord,
        coord_list_index: coords.length - 1,
        name: name_cs,
        path: `assets/cards/${card.set}/${card.id}.jpg`,
      });
    }
  });
  return { acquired_cards: acs, visited_coords: coords };
}

class Recap_game extends Component {
  state: { hovered_card_index: number } = { hovered_card_index: null }

  render() {
    const deck = get_player_deck();

    const birth_gate_select_event = find_event_forward(is_Birth_gate_select);
    const birth_gate_place_name = birth_gate_select_event.payload.place_name;
    const birth_gate = get_gate_info(birth_gate_place_name, birth_gate_name_list);

    const end_game_event = find_event_backward(is_End_game);
    const end_gate_enter_event = find_event_backward(is_Enter_spot, end_game_event);
    const end_gate_place_name = end_gate_enter_event.payload.place_name as Gate_name;
    const end_gate = get_gate_info(end_gate_place_name, death_gate_name_list);

    const { acquired_cards, visited_coords } = get_visited();
    const displayed_coords_cap = this.state.hovered_card_index !== null && this.state.hovered_card_index >= 0
        ? acquired_cards[this.state.hovered_card_index].coord_list_index
        : visited_coords.length;
    const displayed_coords = visited_coords.slice(0, displayed_coords_cap);
    const highlighted_coord = this.state.hovered_card_index === null
        ? null
        : this.state.hovered_card_index === -1
        ? get_coord(world_center, null)
        : acquired_cards[this.state.hovered_card_index].coord;

    return html`
      <${Overlay}>
        <div class="recap-root recap-game">
          <h2>Rekapitulace hry</h2>

          <dl
            class="recap-game__gate recap-game__birth-gate"
            onMouseEnter=${() => this.setState({ hovered_card_index: 0 })}
            onMouseLeave=${() => this.setState({ hovered_card_index: null })}
          >
            <dt>Začátek</dt>
            <dt>Brána odhodlání</dt>
            <dd>${birth_gate.number}: ${birth_gate.name}</dd>
          </dl>
          <div class="recap-game__avatar">
            <img src="assets/avatars/${deck.set}.png" />
            <p>${avatar_names[deck.set]}</p>
          </div>
          <dl
            class="recap-game__gate recap-game__end-gate"
            onMouseEnter=${() => this.setState({ hovered_card_index: -1 })}
            onMouseLeave=${() => this.setState({ hovered_card_index: null })}
          >
            <dt>Konec</dt>
            <dt>Brána pochopení</dt>
            <dd>${end_gate.number}: ${end_gate.name}</dd>
          </dl>

          <img class="recap-game__card-binding recap-game__card-binding--down" src="assets/ui/gate-arrow-down.svg" />
          <img class="recap-game__card-binding recap-game__card-binding--up" src="assets/ui/gate-arrow-up.svg" />

          <div
            class="recap-game__cards"
            onMouseLeave=${() => this.setState({ hovered_card_index: null })}
          >
            ${acquired_cards.map(({ evt, name, path }, i) => html`
              <span>
                <img
                  src="${path}"
                  title="${name}"
                  onClick=${() => recap_last_card_draw(evt)}
                  onMouseEnter=${() => this.setState({ hovered_card_index: i })}
                />
              </span>
            `)}
          </div>

          <img class="recap-game__minimap" src="assets/world.jpg" />
          <svg class="recap-game__minimap" viewBox="0 0 ${world_width} ${world_height}">
            ${displayed_coords.map(({ x, y }) => html`
              <circle cx="${x}" cy="${y}" r="50" fill="rgba(0, 0, 0, 0.5)" />
            `)}
            ${
              highlighted_coord && html`
                <image href="assets/avatars/${deck.set}.png" x="${highlighted_coord.x - 80}" y="${highlighted_coord.y - 80}" width="160" height="160" />
              `
            }
          </svg>

          ${/users.*games/.test(window.location.hash) ? null : html`<p class="recap-game__footer">
            <button type="button" onClick=${order_board_game}>
              Objednat deskovou verzi hry
            </button>
            <button type="button" onClick=${request_interpretation}>
              Požádat o výklad průběhu hry
            </button>
            <button type="button" onClick=${() => { clear_saved_game(); location.reload(); }}>Hrát znovu</button>
          </p>`}
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
