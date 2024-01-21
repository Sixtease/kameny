import { h, Component, render } from 'preact';
import htm from 'htm';

import card_meta from '../constants/card_meta.json';
import { Overlay } from './overlay';

const html = htm.bind(h);

interface One_of_picked_cards_detail_props {
  url: string;
  card_id: string;
  on_accept: () => void;
}

function get_card_exegesis(card_id: string): string {
  return card_meta[card_id]?.exegesis ?? null;
}

function close() {
  document.getElementById('preact-root').classList.remove('recap-shown');
}

class One_of_picked_cards_detail extends Component<One_of_picked_cards_detail_props> {
  render({ url, card_id, on_accept }: One_of_picked_cards_detail_props) {
    const exegesis = get_card_exegesis(card_id);
    return html`
      <${Overlay}>
        <div class="card-detail">
          <img src="${url}" />
          <div class="card-detail-sidebar">
            <p class="card-detail-exegesis">${exegesis}</p>
            <div class="card-detail-buttons">
              <button class="card-detail-yes" onClick=${() => { on_accept(); close(); }}>OK</button>
              <button class="card-detail-no" onClick=${close}>zpět</button>
            </div>
          </div>
        </div>
      </Overlay>
    `;
  }
}

export const one_of_picked_cards_detail = ({ url, card_id, on_accept }: One_of_picked_cards_detail_props) => {
  const root = document.getElementById('preact-root');
  render(
    html`<${One_of_picked_cards_detail} url=${url} on_accept=${on_accept} card_id=${card_id} />`,
    root
  );
  root.classList.add('recap-shown');
};
