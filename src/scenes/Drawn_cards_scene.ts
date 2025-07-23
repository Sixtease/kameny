import 'phaser';

import { step_button_layout_breakpoint, viewport_width } from '../constants';
import { GlobalCard, get_card_key } from '../constants/cards';
import { hist, is_Pick_cards, is_Select_from_presented_cards } from '../game/events';
import { recap_last_card_draw } from '../templates/recap-card-draw';

export class Drawn_cards_scene extends Phaser.Scene {
  constructor() {
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

  add_card(card: GlobalCard, { load = false, trust = false, i = null }: { trust?: boolean; load?: boolean; i?: number } = { load: false, trust: false, i: null }) {
    const card_key = get_card_key(card.set, card.id);
    if (i !== null && i < this.card_count) {
      return;
    }
    if (!this.textures.list[card_key] && !trust) {
      if (load) {
        this.load.image(card_key, `assets/cards/${card.set}/${card.id}.jpg`);
        this.load.once('complete', () => this.add_card(card, { trust: true, i: this.card_count }));
        this.load.start();
      } else {
        setTimeout(() => this.add_card(card, { load: true, i: this.card_count }), 100);
      }
      return;
    }
    const narrow_layout = viewport_width < step_button_layout_breakpoint
    const offset = narrow_layout ? 0 : 100 - this.card_count;
    const x = offset;
    const y = offset;
    this.card_count++;
    const sprite = this.add.sprite(x, y, card_key).setScale(0.1);
    if (narrow_layout) sprite.setOrigin(1, 1);
    sprite.setInteractive({ cursor: 'pointer' });
    sprite.on('pointerup', () => recap_last_card_draw());
  }
}
