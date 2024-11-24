import { h, Component, render } from 'preact';
import htm from 'htm';

const html = htm.bind(h);

export class About_to_teleport extends Component<{}> {
  render() {
    return html`
      <div class="guide-page guide-page--on-teleport guide-page--about-to-teleport">
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

export class Just_teleported extends Component<{}> {
  render() {
    return html`
      <div class="guide-page guide-page--on-teleport guide-page--just-teleported">
        <p>
          Právě ses teleportoval.
          Pokračuj v cestě, na kterou ses dostal, tlačítkem „Další krok“.
        </p>
      </div>
    `;
  }
}

export const about_to_teleport = () => {
  render(
    html`<${About_to_teleport} />`,
    document.getElementById('guide-root')
  );
  document.getElementById('guide-container').classList.add('guide-on');
};
