import { h, Component, render } from 'preact';
import htm from 'htm';

import { game_intro } from './game-intro';
import { offer_load_game } from './load-game';
import { Overlay } from './overlay';

function next() {
  offer_load_game() || game_intro();
}

const html = htm.bind(h);

function pageDown() {
  document.querySelector('.recap-overlay').scrollBy({
    top: window.innerHeight,
    left: 0,
    behavior: 'smooth',
  });
}

function scrolledToBottom() {
  const el = document.querySelector('.recap-overlay');
  const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight;
  return atBottom;
}

function continueHandler() {
  if (scrolledToBottom()) {
    next();
  }
  else {
    pageDown();
  }
}

class Cover_page extends Component<{}> {
  render() {
    return html`
      <${Overlay}>
        <div class="cover-page">
          <div class="cover-page__text">
            <h1>Moudrost <span>v síle kamenů</span></h1>
            <h2 class="author">Jiřina Lockerová</h2>
            <h2 class="subtitle">sebepoznávací hra</h2>
            <div class="status-line">
              <button onClick=${continueHandler}>pokračovat</button>
            </div>
          </div>
        </div>
        <div class="cover-page__explanation">
          <h1>Moudrost v síle kamenů</h1>
          <p>Sebepoznávací hra</p>
          <h2>O hře</h2>
          <p>
            Moudrost v síle kamenů je meditativní hra, kterou můžete využít pro získání vhledu
            do situace, kterou procházíte, do svého života nebo pro usebrání.
          </p>

          <h3>Hrací pole</h3>
          <img src="assets/world.jpg" alt="" class="cover-page__world-preview" />
          <p>
            Hrací pole zobrazuje „labyrint světa“ a „ráj srdce“. Střed hracího pole je
            stav před stvořením, před vstupem do života nebo do situace a také stav po vyřešení situace, po ukončení životního cyklu.
            Bludiště kolem středové části symbolizuje svět a život v něm.
          </p>

          <h3>Karty kamenů</h3>
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

          <h2>Jak hrát</h2>
          <p>
            Na začátku si zvolíte, v jaké rovině chcete na svoji situaci nahlížet.
            Podle toho si vyberete hrací kámen. Ten pak představuje vaši pozici v labyrintu.
            Krok za krokem se posouváte po hracím poli, až se vrátíte do středu.
          </p>
        </div>
      </Overlay>
    `;
  }
}

export const cover_page = () => {
  const root = document.getElementById('preact-root');
  render(
    html`<${Cover_page} />`,
    root
  );
  root.classList.add('recap-shown');
};
