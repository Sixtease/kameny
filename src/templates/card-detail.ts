import { h, Component, render } from 'preact';
import htm from 'htm';

const html = htm.bind(h);

interface Card_detail_props {
  url: string;
  on_accept: () => void;
}

function close() {
  document.getElementById('preact-root').classList.remove('recap-shown');
}

class Card_detail extends Component<Card_detail_props> {
  render({ url, on_accept }: Card_detail_props) {
    return html`
      <div class="card-detail">
        <img src="${url}" />
        <div class="card-detail-buttons">
          <p>Chceš tuto kartu?</p>
          <button class="card-detail-yes" onClick=${() => { on_accept(); close(); }}>Ano</button>
          <button class="card-detail-no" onClick=${close}>Ne</button>
        </div>
      </div>
    `;
  }
}

export const card_detail = ({ url, on_accept }: Card_detail_props) => {
  const root = document.getElementById('preact-root');
  render(
    html`<${Card_detail} url=${url} on_accept=${on_accept} />`,
    root
  );
  root.classList.add('recap-shown');
};

