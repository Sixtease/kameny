import { h, Component, render } from 'preact';
import htm from 'htm';

import { CARD_SET } from '../constants/cards';
import {
  Game_event,
  Pick_cards,
  Select_from_presented_cards,
  find_event_backward,
  find_event_forward,
  is_Pick_cards,
  is_Select_from_presented_cards,
} from '../game/events';
import { Overlay } from './overlay';
import { Card_draw_pick } from './recap-card-draw-pick';
import { Card_draw_select } from './recap-card-draw-select';

type Draw_event = Select_from_presented_cards | Pick_cards;

interface Card_draw_state {
  draw_event: Draw_event;
}
interface Card_draw_props extends Card_draw_state {
  set: CARD_SET;
  onOverlayClose: () => void;
}

const html = htm.bind(h);

const is_draw_event = (evt: Game_event) => is_Select_from_presented_cards(evt) || is_Pick_cards(evt);

class Card_draw extends Component<Card_draw_props> {
  state: Card_draw_state;

  render(props: Card_draw_props, state: Card_draw_state) {
    const draw_event: Draw_event = state.draw_event || props.draw_event;
    const prev_draw_event = find_event_backward(is_draw_event, draw_event);
    const next_draw_event = find_event_forward(is_draw_event, draw_event);
    
    return html`
      <${Overlay} onClose=${() => this.setState({ draw_event: null })}>
        <div class="recap-root">
          ${ prev_draw_event
            ? html`<a class="recap-link recap-link-left" onClick=${() => this.setState({ ...this.state, draw_event: prev_draw_event })}>˂ předchozí</a>` 
            : null
          }
          ${ next_draw_event
            ? html`<a class="recap-link recap-link-right" onClick=${() => this.setState({ ...this.state, draw_event: next_draw_event })}>další ˃</a>` 
            : null
          }
          ${
            is_Select_from_presented_cards(draw_event)
              ? html`<${Card_draw_select} draw_event=${draw_event} />`
              : html`<${Card_draw_pick}   draw_event=${draw_event} />`
          }
        </div>
      </Overlay>
    `;
  }
}

export const recap_last_card_draw = (evt?: Game_event) => {
  const draw_event = find_event_backward(is_draw_event, evt) as Select_from_presented_cards;
  const root = document.getElementById('preact-root');
  render(
    html`<${Card_draw } draw_event=${draw_event} />`,
    root
  );
  root.classList.add('recap-shown');
};
