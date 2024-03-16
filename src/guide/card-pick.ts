import { h, Component, render } from 'preact';
import htm from 'htm';

const html = htm.bind(h);

export class Card_pick extends Component<{}> {
  render() {
    return html`
      <div class="guide-page guide-page--card-pick">
        <p>
          Dostal's kartu. V životě ses setkal s kvalitou, kterou reprezentuje.
        </p>
        <p>
          Můžeš se k ní vrátit kliknutím na štůsek karet v pravém dolním rohu.
        </p>
      </div>
    `;
  }
}

export const card_pick = () => {
  render(
    html`<${Card_pick} />`,
    document.getElementById('guide-root')
  );
  document.getElementById('guide-container').classList.add('guide-on');
};
