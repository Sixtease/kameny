import { h, Component, render } from 'preact';
import htm from 'htm';

const html = htm.bind(h);

export class Prebirth extends Component<{}> {
  render() {
    return html`
      <div class="guide-page guide-page--prebirth">
        <p>
          Jsi před zrozením do světa.
        </p>
        <p>
          Klikni na svého avatara (svůj hrací kámen) nebo na tlačítko „Další krok“.
        </p>
      </div>
    `;
  }
}

export const prebirth = () => {
  render(
    html`<${Prebirth} />`,
    document.getElementById('guide-root')
  );
  document.getElementById('guide-container').classList.add('guide-on');
};
