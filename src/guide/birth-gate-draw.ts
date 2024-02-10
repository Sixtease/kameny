import { h, Component, render } from 'preact';
import htm from 'htm';

const html = htm.bind(h);

export class Birth_gate_draw extends Component<{}> {
  render() {
    return html`
      <div class="guide-page guide-page--birth-gate-select">
        <p>
          Vyber si jednu z nabízených karet.
          Každá je náhodně přiřazena jedné z šesti bran.
          Výběrem brány získáš kvalitu, se kterou vstoupíš do života ve světě.
        </p>
      </div>
    `;
  }
}

export const birth_gate_draw = () => {
  render(
    html`<${Birth_gate_draw} />`,
    document.getElementById('guide-root')
  );
  document.getElementById('guide-container').classList.add('guide-on');
};
