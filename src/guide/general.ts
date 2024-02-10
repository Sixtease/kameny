import { h, Component, render } from 'preact';
import htm from 'htm';

const html = htm.bind(h);

export class General extends Component<{}> {
  render() {
    return html`
      <div class="guide-page guide-page--general">
        <p>
          Stojíš před dalším krokem ve svém životě.
        </p>
        <p>
          Použij tlačítko „Další krok“ nebo klikni na svůj hrací kámen.
        </p>
      </div>
    `;
  }
}

export const general = () => {
  render(
    html`<${General} />`,
    document.getElementById('guide-root')
  );
  document.getElementById('guide-container').classList.add('guide-on');
};
