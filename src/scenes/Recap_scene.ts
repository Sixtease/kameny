import 'phaser';

import { get_card_key } from '../constants/cards';
import { hist, is_Present_cards, is_Select_from_presented_cards, Present_cards, Select_from_presented_cards } from '../game/events';

export class Recap_scene extends Phaser.Scene {
  constructor () {
    super({ key: 'Recap' });
  }

  update() { }

  cam() {
    return this.cameras.main;
  }

  show_card_selection(select_evt: Select_from_presented_cards) {
    const select_evt_idx = hist.indexOf(select_evt);
    const present_evt: Present_cards = (() => {
      for (let i = select_evt_idx; i >= 0; i--) {
        const evt = hist[i];
        if (is_Present_cards(evt)) return evt;
      }
      return null;
    })();
    console.log('present_evt', present_evt);
    if (!present_evt) return;
    this.add.text(0, 0, 'Z těchto karet:');
    const group = this.add.group();
    present_evt.payload.cards.forEach((card) => {
      const sprite = this.add.sprite(0, 0, get_card_key(present_evt.payload.set, card));
      sprite.setScale(0.3);
      group.add(sprite);
    });
    const line = new Phaser.Geom.Line(100, 300, 800, 300);
    Phaser.Actions.PlaceOnLine(group.getChildren(), line);
    this.add.text(0, 500, 'sis vybral tuto:');
    const card_key = get_card_key(select_evt.payload.card.set, select_evt.payload.card.id);
    this.add.sprite(100, 700, card_key).setScale(0.4);
  }

  end_game_recap() {
    this.scene.setActive(true);
    const sel_card_evt = hist.find(evt => is_Select_from_presented_cards(evt));
    if (is_Select_from_presented_cards(sel_card_evt)) {
      this.show_card_selection(sel_card_evt);
    }
  }
}

