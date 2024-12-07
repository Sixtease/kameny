import { h, Component, render } from 'preact';
import htm from 'htm';

import { GlobalCard } from '../constants/cards';
import card_meta from '../constants/card_meta.json';
import { card_detail } from './card-detail';
import { Overlay } from './overlay';

const html = htm.bind(h);

interface Card_render_info {
  url: string;
  card_id: string;
  exegesis: string;
  name_cs: string;
}
interface Picked_card_list_props {
  cards: Card_render_info[];
  return_from_detail: () => void;
}
interface Pick_cards_props {
  cards: GlobalCard[];
}

function close() {
  document.getElementById('preact-root').classList.remove('recap-shown');
}

const get_cards_render_info = (cards: GlobalCard[]): Card_render_info[] => {
  return cards.map((card: GlobalCard) => {
    const { set, id } = card;
    const { exegesis, name_cs } = card_meta[id];
    const url = `assets/cards/${set}/${id}.jpg`;
    return {
      card_id: id,
      exegesis,
      name_cs,
      url,
    };
  });
};

export class Picked_card_list extends Component<Picked_card_list_props> {
  render({ cards, return_from_detail }: Picked_card_list_props ) {
    return html`
      <div class="recap-card-offer recap-card-offer-multiple">
        <p>Dostal's tyto karty:</p>
        <ul>
          ${cards.map(({url, card_id, exegesis, name_cs}: Card_render_info) => {
            return html`
              <li key=${card_id}>
                <a
                  onClick=${
                    () => card_detail({
                      url,
                      card_id,
                      on_accept: () => {},
                      query: null,
                      buttons: [
                        {
                          text: 'zpět',
                          on_click: () => {
                            return_from_detail();
                          },
                          close: false,
                        }
                      ]
                    })
                  }
                >
                  <img src="${url}" alt="" />
                </a>
                ${name_cs}
                <p class="card-detail-accompanying-text">${exegesis}</p>
              </li>
            `;
          })}
        </ul>
      </div>
    `;
  }
}

export const picked_card_list = ({ cards, return_from_detail }: Picked_card_list_props) => {
  const root = document.getElementById('preact-root');
  render(
    html`<${Picked_card_list} cards=${cards} return_from_detail=${return_from_detail} />`,
    root
  );
  root.classList.add('recap-shown');
};

class Pick_cards extends Component<Pick_cards_props> {
  render({ cards }: Pick_cards_props) {
    const cards_render_info = get_cards_render_info(cards);
    return html`
      <${Overlay}>
        <div class="recap-root">
          <${Picked_card_list} cards=${cards_render_info} return_from_detail=${() => { pick_cards({ cards }) }} />
          <div class="card-detail-buttons">
            <button class="card-detail-yes" onClick=${close}>OK</button>
          </div>
        </div>
      </Overlay>
    `;
  }
}

export const pick_cards = ({ cards }: Pick_cards_props) => {
  const root = document.getElementById('preact-root');
  render(
    html`<${Pick_cards} cards=${cards} />`,
    root
  );
  root.classList.add('recap-shown');
};
