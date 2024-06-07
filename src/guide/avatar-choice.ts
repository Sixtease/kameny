import { h, Component, render } from 'preact';
import htm from 'htm';

const html = htm.bind(h);

export class Avatar_choice extends Component<{}> {
  render() {
    return html`
      <div class="guide-page guide-page--avatar-choice">
        <h1>Výklad k výběru hracího kamene</h1>
        <ul>
          <li>
            <img src="assets/avatars/mother.png" alt="" />
            <b>Velká Matka</b>
            – znamená, že v průběhu hry všechny informace a podněty, které získáš, se budou týkat více <b>těla a hmotného světa</b>.
          </li>
          <li>
            <img src="assets/avatars/child.png" alt="" />
            <b>Dítě</b>
            -  znamená, že v průběhu hry všechny informace a podněty, které získáš, se budou týkat více <b>jednoty těla a ducha</b>, emocionálních vztahů a růstu.
          </li>
          <li>
            <img src="assets/avatars/melchisedech.png" alt="" />
            <b>Duchovní otec</b>
            - znamená, že v průběhu hry všechny informace a podněty, které získáš, se budou týkat více <b>ducha</b>.
            Duch není protikladem těla, duch není protikladem ničeho.
          </li>
        </ul>

        <p>Výklad ke hře můžeš kdykoliv schovat tlačítkem napravo a opět zobrazit.</p>
      </div>
    `;
  }
}

export const avatar_choice = () => {
  render(
    html`<${Avatar_choice} />`,
    document.getElementById('guide-root')
  );
  document.getElementById('guide-container').classList.add('guide-on');
};
