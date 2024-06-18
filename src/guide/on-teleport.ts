import { h, Component, render } from 'preact';
import htm from 'htm';

const html = htm.bind(h);

export class On_teleport extends Component<{}> {
  render() {
    return html`
      <div class="guide-page guide-page--on-crossroad">
        <p>
          Stojís na teleportu.
          Vytáhneš si zde karty, každou pro jeden teleport, do kterého se můžeš dostat.
          Medituj nad každou kartou a vyber si tu, která tě nejvíce osloví.
          Tím se rozhodne, kterým směrem se vydáš.
        </p>
      </div>
    `;
  }
}

export const on_teleport = () => {
  render(
    html`<${On_teleport} />`,
    document.getElementById('guide-root')
  );
  document.getElementById('guide-container').classList.add('guide-on');
};
