import { h, Component, render } from 'preact';
import htm from 'htm';

import { CARD_SET, Card, Single_set_cards } from '../constants/cards';
import { Present_cards, Select_from_presented_cards, event_occurred } from '../game/events';
import { Overlay } from './overlay';

interface Card_draw_props {
  offer: Single_set_cards;
  picked: Card;
  set: CARD_SET;
}

const html = htm.bind(h);

class Card_draw extends Component<Card_draw_props> {
  state: { todos: string[] };

  addTodo() {
    const { todos = [] } = this.state;
    this.setState({ todos: todos.concat(`Item ${todos.length}`) });
  }
  render({ offer, picked, set }, { todos = [] }) {
    return html`
      <${Overlay}>
        <div class="recap-root">
          <p>Z těchto karet:</p>
          <ul>
            ${offer.map((card: Card) => html`
              <li key=${card}>${card}</li>
            `)}
          </ul>
          <p>sis vybral tuto: ${picked}</p>
        </div>
      </Overlay>
    `;
  }
}

export const recap_card_draw = ({ offer, picked, set }: Card_draw_props) => {
  const root = document.getElementById('preact-root');
  render(
    html`<${Card_draw } offer=${offer} picked=${picked} set=${set} />`,
    root
  );
  root.classList.add('recap-shown');
};

export const recap_last_card_draw = () => {
    const last_drawn = event_occurred('Select_from_presented_cards') as Select_from_presented_cards;
    const draw = event_occurred('Present_cards', last_drawn) as Present_cards;
    const drawn_card = last_drawn.payload.card;
    const offer = draw.payload.cards;
    recap_card_draw({ offer, picked: drawn_card.id, set: drawn_card.set });
};
