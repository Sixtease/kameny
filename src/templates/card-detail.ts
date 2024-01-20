import { h, Component, render } from 'preact';
import htm from 'htm';

import card_meta from '../constants/card_meta.json';
import { Overlay } from './overlay';

const html = htm.bind(h);

interface Card_detail_props {
  url: string;
  card_id: string;
  on_accept: () => void;
  on_close: () => void;
}

function get_card_exegesis(card_id: string): string {
  return card_meta[card_id]?.exegesis ?? null;
}

function close() {
  document.getElementById('preact-root').classList.remove('recap-shown');
}

class Card_detail extends Component<Card_detail_props> {
  render({ url, card_id, on_accept, on_close }: Card_detail_props) {
    const exegesis = get_card_exegesis(card_id);
    return html`
      <${Overlay}>
        <div class="card-detail">
          <img src="${url}" />
          <div class="card-detail-sidebar">
            <p class="card-detail-exegesis">${exegesis}</p>
            <div class="card-detail-buttons">
              <p>Chceš tuto kartu?</p>
              <button class="card-detail-yes" onClick=${() => { on_accept(); close(); }}>Ano</button>
              <button class="card-detail-no" onClick=${() => { close(); on_close(); }}>Ne</button>
            </div>
          </div>
        </div>
      </Overlay>
    `;
  }
}

export const card_detail = ({ url, card_id, on_accept, on_close }: Card_detail_props) => {
  const root = document.getElementById('preact-root');
  render(
    html`<${Card_detail} url=${url} on_accept=${on_accept} on_close=${on_close} card_id=${card_id} />`,
    root
  );
  root.classList.add('recap-shown');
};

