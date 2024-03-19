import { h, Component, render } from 'preact';
import htm from 'htm';

import { Pick_cards, find_event_backward, is_Pick_cards } from '../game/events';
import card_meta from '../constants/card_meta.json';

const html = htm.bind(h);

export class On_crossroad extends Component<{}> {
  render() {
    const pick_card_evt = find_event_backward<Pick_cards>(is_Pick_cards);
    const [card] = pick_card_evt.payload.cards;
    const card_info = card_meta[card];

    return html`
      <div class="guide-page guide-page--on-crossroad">
        <p>
          Stojís na křižovatce. Pojí se k ní karta <strong>${card_info.name_cs}</strong>, kterou dostáváš automaticky.
        </p>
        <p>
          Na křižovatce si vytáhneš karty, každou pro jeden směr, kterým se lze vydat.
          Medituj nad každou kartou a vyber si tu, která tě nejvíce osloví.
          Tím se rozhodne, kterým směrem se vydáš.
        </p>
      </div>
    `;
  }
}

export const on_crossroad = () => {
  render(
    html`<${On_crossroad} />`,
    document.getElementById('guide-root')
  );
  document.getElementById('guide-container').classList.add('guide-on');
};

