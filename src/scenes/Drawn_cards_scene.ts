import 'phaser';

import { viewport_width, viewport_height } from '../constants';
import { GlobalCard, get_card_key } from '../constants/cards';
import { hist, is_Pick_cards, is_Select_from_presented_cards } from '../game/events';

export class Drawn_cards_scene extends Phaser.Scene {
  constructor () {
    super({ key: 'Drawn_cards', active: true });
  }

  private event_index = 0;
  private card_count = 0;

  update() {
    for (; this.event_index < hist.length; this.event_index++) {
      const evt = hist[this.event_index];
      if (is_Pick_cards(evt)) {
        evt.payload.cards.forEach((card) => {
          this.add_card({ set: evt.payload.set, id: card });
        });
      }
      if (is_Select_from_presented_cards(evt)) {
        this.add_card(evt.payload.card);
      }
    }
  }

  cam() {
    return this.cameras.main;
  }

  add_card(card: GlobalCard) {
    const card_key = get_card_key(card.set, card.id);
    if (!this.textures.list[card_key]) {
      setTimeout(() => this.add_card(card), 100);
      return;
    }
    const x = viewport_width - 100 + this.card_count;
    const y =  viewport_height - 100 + this.card_count;
    this.card_count++;
    this.add.sprite(x, y, card_key).setScale(0.1);
  }
}
