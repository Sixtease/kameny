import { h, Component, render } from 'preact';
import htm from 'htm';

import card_meta from '../constants/card_meta.json';

const html = htm.bind(h);

interface Card_detail_props {
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

class Card_detail extends Component<Card_detail_props> {
  render({ url, card_id, on_accept }: Card_detail_props) {
    console.log('card id', card_id, card_meta);
    const exegesis = get_card_exegesis(card_id);
    return html`
      <div class="card-detail">
        <img src="${url}" />
        <div class="card-detail-accompanying-text">${exegesis}</div>
        <div class="card-detail-buttons">
          <p>Chceš tuto kartu?</p>
          <button class="card-detail-yes" onClick=${() => { on_accept(); close(); }}>Ano</button>
          <button class="card-detail-no" onClick=${close}>Ne</button>
        </div>
      </div>
    `;
  }
}

export const card_detail = ({ url, card_id, on_accept }: Card_detail_props) => {
  const root = document.getElementById('preact-root');
  render(
    html`<${Card_detail} url=${url} on_accept=${on_accept} card_id=${card_id} />`,
    root
  );
  root.classList.add('recap-shown');
};

