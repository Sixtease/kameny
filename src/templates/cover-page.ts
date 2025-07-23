import { h, Component, render } from 'preact';
import htm from 'htm';

// import { second } from '../constants';
import { game_intro } from './game-intro';
import { offer_load_game } from './load-game';
import { Overlay } from './overlay';

function next() {
  offer_load_game() || game_intro();
}

interface Cover_page_props {
  green_to_go: boolean;
}

interface Cover_page_state {
  phase: number;
}

const stati = [
  { duration: 2, line: 'inicializuji' },
  { duration: 3, line: 'nahrávám' },
  { duration: 1, line: 'spouštím' },
];

const html = htm.bind(h);

class Cover_page extends Component<Cover_page_props> {
  state: Cover_page_state = {
    phase: 0,
  }

  render({ green_to_go }: Cover_page_props) {
    const { phase } = this.state;
    if (!stati[phase] && green_to_go) {
      next();
      return null;
    }

    /*
    if (stati[phase + 1] || green_to_go) {
      setTimeout(
        () => this.setState({ phase: phase + 1 }),
        duration * second
      );
    }
    */

    return html`
      <${Overlay}>
        <div class="cover-page">
          <div class="cover-page__text">
            <h1>Moudrost <span>v síle kamenů</span></h1>
            <h2 class="author">Jiřina Lockerová</h2>
            <h2 class="subtitle">sebepoznávací hra</h2>
            <div class="status-line">
              <button onClick=${next}>hrát</button>
            </div>
          </div>
        </div>
        <div class="cover-page__explanation">
          <h1>Moudrost v síle kamenů</h1>
          <p>Sebepoznávací hra</p>
          <h2>Jak hrát</h2>
          <p>
            Moudrost v síle kamenů je meditativní hra, kterou můžete využít pro získání vhledu
            do situace, kterou procházíte, do svého života nebo pro usebrání.
          </p>
          <img src="assets/world.jpg" alt="" class="cover-page__world-preview" />
          <p>
            Hrací pole zobrazuje „labyrint světa“ a „ráj srdce“. Střed hracího pole je
            stav před stvořením, před vstupem do života nebo do situace a také stav po vyřešení situace, po ukončení životního cyklu.
            Bludiště kolem středové části symbolizuje svět a život v něm.
          </p>
          <img src="assets/cards/mother/jade.jpg" alt="" class="cover-page__card-preview" />
          <img src="assets/cards/mother/topaz.jpg" alt="" class="cover-page__card-preview" />
          <p>
            Při průchodu bludištěm narážíte na křižovatky, kde si cestu vybíráte pomocí karet kamenů.
            Každé cestě odpovídá jiný kámen, nelze určit, který vede kam.
            Meditace nad obrazy kamenů je hlavní součástí hry.
          </p>
          <p>
            Sada karet, které si vytáhnete v průběhu hry, spolu s jejich výklady, je pak hlavním výstupem hry,
            který vám může pomoci ke kýženému vhledu do situace.
          </p>
          <p><button onClick=${next}>hrát</button></p>
        </div>
      </Overlay>
    `;
  }
}

export const cover_page = () => {
  const root = document.getElementById('preact-root');
  render(
    html`<${Cover_page} status_line="nahrávám" green_to_go />`,
    root
  );
  root.classList.add('recap-shown');
};
