import 'phaser';

import { CARD_SET, Card, GlobalCard } from '../constants/cards';
import { golden_ratio, viewport_center } from '../constants';

function get_radius() {
  const r = Math.min(viewport_center.x, viewport_center.y);
  return r / golden_ratio;
}

export class Card_scene extends Phaser.Scene {
  constructor () {
    super('Cards');
  }

  circle = new Phaser.Geom.Circle(viewport_center.x, viewport_center.y, get_radius());
  group = this.add.group();

  preload() {
    //this.load.image('map', 'assets/cards/child/amethyst.jpg');
  }

  create() {
    this.cam().setBackgroundColor('rgba(255, 255, 255, 0.5)');

    //this.input.on('pointermove', (evt) => this.handle_mouse_move(evt));
    //this.input.on('wheel', (pointer, objs, dx, dy, dz) => this.handle_mousewheel(pointer, objs, dx, dy, dz));
  }

  update() {
  }

  cam() {
    return this.cameras.main;
  }

  handle_card_click(card: GlobalCard) {
    this.group.clear(true, true);
    this.scene.setActive(false);
    this.scene.sendToBack();
    this.scene.setVisible(false);
  }

  show_cards(cards: GlobalCard[]) {
    console.log('showing cards', cards);
    cards.forEach((card) => {
      this.load.image(get_img_key(card.set, card.id), `assets/cards/${card.set}/${card.id}.jpg`);
    });
    this.load.on('complete', () => {
      cards.forEach(card => {{
        const key = get_img_key(card.set, card.id);
        const sprite = this.add.sprite(0, 0, key);
        sprite.on('pointerup', () => this.handle_card_click(card));
        sprite.setScale(0.2);
        this.group.add(sprite);
      }});
      Phaser.Actions.PlaceOnCircle(this.group.getChildren(), this.circle);
      this.scene.setActive(true);
      this.scene.bringToTop();
      this.scene.setVisible(true);
    });
    this.load.start();
  }
}

function get_img_key(set: CARD_SET, card_id: Card): string {
  return [set, card_id].join('.');
}
