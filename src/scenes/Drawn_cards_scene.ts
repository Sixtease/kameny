import 'phaser';

import { viewport_width, viewport_height } from '../constants';
import { GlobalCard, get_card_key } from '../constants/cards';
import { hist, is_Pick_cards } from '../game/events';

export class Drawn_cards_scene extends Phaser.Scene {
  constructor () {
    super('Drawn_cards');
  }

  private event_index = 0;

  update() {
    for (; this.event_index < hist.length; this.event_index++) {
      const evt = hist[this.event_index];
      console.log('lookung at event', this.event_index, evt);
      if (is_Pick_cards(evt)) {
        evt.payload.cards.forEach((card) => {
          this.add_card({ set: evt.payload.set, id: card });
        });
      }
    }
  }

  cam() {
    return this.cameras.main;
  }

  add_card(card: GlobalCard) {
    console.log('adding card', card);
    this.add.sprite(viewport_width - 100, viewport_height - 100, get_card_key(card.set, card.id))
  }
}
