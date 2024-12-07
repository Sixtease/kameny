import { h, Component, render } from 'preact';
import htm from 'htm';

import card_meta from '../constants/card_meta.json';
import { Overlay } from './overlay';

const html = htm.bind(h);

interface Card_detail_props {
  url: string;
  card_id: string;
  on_accept: () => void;
  query?: string;
  buttons?: { text: string, on_click: () => void, close: boolean }[];
}

function get_card_exegesis(card_id: string): string {
  return card_meta[card_id]?.exegesis ?? null;
}

function closeWindow() {
  document.getElementById('preact-root').classList.remove('recap-shown');
}

class Card_detail extends Component<Card_detail_props> {
  render({
    url,
    card_id,
    on_accept,
    query = 'Chceš tuto kartu?',
    buttons = [
      { text: 'Ano', on_click: on_accept, close: true },
      { text: 'Ne', on_click: () => { }, close: true },
    ],
  }: Card_detail_props) {
    const exegesis = get_card_exegesis(card_id);
    return html`
      <${Overlay}>
        <div class="card-detail">
          <img src="${url}" />
          <div class="card-detail-sidebar">
            <p class="card-detail-exegesis">${exegesis}</p>
            <div class="card-detail-buttons">
              <p>${query}</p>
              ${buttons.map(({ text, on_click, close }) => html`
                <button class="card-detail-button" onClick=${() => { on_click(); if (close) closeWindow(); }}>
                  ${text}
                </button>
              `)}
            </div>
          </div>
        </div>
      </Overlay>
    `;
  }
}

export const card_detail = ({ url, card_id, on_accept, query, buttons }: Card_detail_props) => {
  const root = document.getElementById('preact-root');
  render(
    html`
      <${Card_detail}
        url=${url}
        on_accept=${on_accept}
        card_id=${card_id}
        query=${query}
        buttons=${buttons}
      />
    `,
    root
  );
  root.classList.add('recap-shown');
};

interface Recapping_card_detail_props extends Pick<Card_detail_props, 'url' | 'card_id'> {
  return_from_detail: () => void;
}
export const recapping_card_detail = ({ url, card_id, return_from_detail }: Recapping_card_detail_props) => {
  card_detail({
    url,
    card_id,
    on_accept: () => { },
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
  });
}
