import { h, Component, render } from 'preact';
import htm from 'htm';

import { viewport_width, viewport_height } from '../constants';
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
// import { debug } from './debug';

interface Card_draw_props {
  set: CARD_SET;
  onOverlayClose: () => void;
  draw_event: Draw_event;
}

const html = htm.bind(h);

class Card_draw extends Component<Card_draw_props> {
  swipe_start_handler: EventListener;
  swipe_end_handler: EventListener;
  touch_start_coord = {x: null, y: null};
  touch_start_scroll_x: number;

  componentDidMount() {
    const recap_root = document.querySelector('.recap-root');
    const recap_overlay = document.querySelector('.recap-overlay');

    this.swipe_start_handler = (evt) => {
      const [touch] = (evt as TouchEvent).touches;
      this.touch_start_coord = {x: touch.clientX, y: touch.clientY};
      this.touch_start_scroll_x = recap_overlay.scrollLeft;
    };

    this.swipe_end_handler = (evt) => {
      const [touch] = (evt as TouchEvent).changedTouches;
      const { draw_event } = this.props;
      const {x, y} = this.touch_start_coord;
      if (x === null || y === null) return;
      const dx = touch.clientX - x;
      const dy = touch.clientY - y;
      const abs_dx = Math.abs(dx);
      const abs_dy = Math.abs(dy);
      if (abs_dx < viewport_width / 10 && abs_dy < viewport_height / 10) return;
      const touch_end_scroll_x = recap_overlay.scrollLeft;
      if (abs_dx > 2 * abs_dy && Math.abs(touch_end_scroll_x - this.touch_start_scroll_x) < 10) {
        if (dx > 0) {
          const prev_draw_event = find_event_backward<Draw_event>(is_Draw_event, draw_event);
          if (prev_draw_event) {
            recap_last_card_draw(prev_draw_event);
          }
        } else {
          const next_draw_event = find_event_forward<Draw_event>(is_Draw_event, draw_event);
          if (next_draw_event) {
            recap_last_card_draw(next_draw_event);
          }
        }
      }
    };

    recap_root.addEventListener('touchstart', this.swipe_start_handler);
    recap_root.addEventListener('touchend', this.swipe_end_handler);
  }

  componentWillUnmount() {
    const recap_root = document.querySelector('.recap-root');
    recap_root.removeEventListener('mousedown', this.swipe_start_handler);
    recap_root.removeEventListener('mouseup', this.swipe_end_handler);
  }

  render({ draw_event }: Card_draw_props) {
    const game_ended = find_event_forward<Recap_game>(is_Recap_game, draw_event);
    const prev_draw_event = find_event_backward<Draw_event>(is_Draw_event, draw_event);
    const next_draw_event = find_event_forward<Draw_event>(is_Draw_event, draw_event);

    const on_close = game_ended ? () => { recap_game(); return false; } : () => this.setState({ draw_event: null });
    
    return html`
      <${Overlay} on_close=${on_close}>
        <div class="recap-root" data-on-swipe-left data-on-swipe-right>
          ${ prev_draw_event
            ? html`<a class="recap-link recap-link-left" onClick=${() => recap_last_card_draw(prev_draw_event)}>${String.fromCharCode(9664)} předchozí</a>`
            : null
          }
          ${ next_draw_event
            ? html`<a class="recap-link recap-link-right" onClick=${() => recap_last_card_draw(next_draw_event)}>další ${String.fromCharCode(9654)}</a>`
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
