import { h, Component, render } from 'preact';
import htm from 'htm';

import { CARD_SET } from '../constants/cards';
import {
  Draw_event,
  Game_event,
  Recap_game,
  Select_from_presented_cards,
  find_event_backward,
  find_event_forward,
  is_Draw_event,
  is_Recap_game,
  is_Select_from_presented_cards,
} from '../game/events';
import { Overlay } from './overlay';
import { Card_draw_pick } from './recap-card-draw-pick';
import { Card_draw_select } from './recap-card-draw-select';
import { recap_game } from './recap-game';

interface Card_draw_props {
  set: CARD_SET;
  onOverlayClose: () => void;
  draw_event: Draw_event;
}

const html = htm.bind(h);


class Card_draw extends Component<Card_draw_props> {
  render({ draw_event }: Card_draw_props) {
    const game_ended = find_event_forward<Recap_game>(is_Recap_game, draw_event);
    const prev_draw_event = find_event_backward<Draw_event>(is_Draw_event, draw_event);
    const next_draw_event = find_event_forward<Draw_event>(is_Draw_event, draw_event);

    const on_close = game_ended ? () => { recap_game(); return false; } : () => this.setState({ draw_event: null });
    
    return html`
      <${Overlay} on_close=${on_close}>
        <div class="recap-root">
          ${ prev_draw_event
            ? html`<a class="recap-link recap-link-left" onClick=${() => recap_last_card_draw(prev_draw_event)}>🢔 předchozí</a>`
            : null
          }
          ${ next_draw_event
            ? html`<a class="recap-link recap-link-right" onClick=${() => recap_last_card_draw(next_draw_event)}>další 🢖</a>`
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
  const draw_event = find_event_backward(is_Draw_event, evt, true) as Select_from_presented_cards;
  const root = document.getElementById('preact-root');
  render(
    html`<${Card_draw } draw_event=${draw_event} />`,
    root
  );
  root.classList.add('recap-shown');
};
