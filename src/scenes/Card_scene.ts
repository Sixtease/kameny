import 'phaser';

import { GlobalCard, get_card_key } from '../constants/cards';
import { golden_ratio, viewport_center, viewport_width } from '../constants';

function get_radius() {
  const r = Math.min(viewport_center.x, viewport_center.y);
  return r / golden_ratio;
}

export class Card_scene extends Phaser.Scene {
  constructor () {
    super('Cards');
  }

  circle = new Phaser.Geom.Circle(viewport_center.x, viewport_center.y, get_radius());
  line = new Phaser.Geom.Line(viewport_center.x, viewport_center.y, viewport_width, viewport_center.y);
  group?: Phaser.GameObjects.Group;
  initialized = false;

  mkgroup() {
    if (!this.group) {
      this.group = this.add.group();
    }
  }

  initialize() {
    if (this.initialized) {
      return;
    }
    this.scene.start('Cards');
    this.cam().setBackgroundColor('rgba(255,255,255,0.5)');
    this.mkgroup();
    this.initialized = true;

    //this.input.on('pointermove', (evt) => this.handle_mouse_move(evt));
    //this.input.on('wheel', (pointer, objs, dx, dy, dz) => this.handle_mousewheel(pointer, objs, dx, dy, dz));
  }

  update() {
  }

  cam() {
    return this.cameras.main;
  }

  handle_card_click(card: GlobalCard, resolve) {
    if (!this.group) return;
    this.group.clear(true, true);
    this.scene.setActive(false);
    this.scene.sendToBack();
    this.scene.setVisible(false);
    this.scene.wake('Main');
    resolve(card);
  }

  load_card_image(card: GlobalCard, resolve: (value: GlobalCard | PromiseLike<GlobalCard>) => void): Phaser.GameObjects.Sprite {
    const me = this;
    const key = get_card_key(card.set, card.id);
    const sprite = me.add.sprite(viewport_center.x, viewport_center.y, key);
    sprite.setInteractive();
    sprite.on('pointerup', () => me.handle_card_click(card, resolve));
    sprite.setScale(0.2);
    return sprite;
  }

  show_cards(cards: GlobalCard[]): Promise<GlobalCard> {
    return new Promise<GlobalCard>((resolve, reject) => {
      this.initialize();
      this.load.image(cards.map(card => ({
        key: get_card_key(card.set, card.id),
        url: `assets/cards/${card.set}/${card.id}.jpg`
      })))
      const me = this;
      me.load.once('complete', function on_load() {
        const loaded_ok = cards.every(card => me.textures.list[get_card_key(card.set, card.id)]);
        if (!loaded_ok) {
          setTimeout(on_load, 100);
          return;
        }
        me.mkgroup();
        cards.forEach(card => {{
          const sprite = me.load_card_image(card, resolve);
          me.group!.add(sprite);
        }});
        if (cards.length === 1) {
          Phaser.Actions.PlaceOnLine(me.group!.getChildren(), me.line);
        }
        else {
          Phaser.Actions.PlaceOnCircle(me.group!.getChildren(), me.circle);
        }
        me.scene.setActive(true);
        me.scene.bringToTop();
        me.scene.setVisible(true);
        me.scene.pause('Main');
        me.scene.wake('Cards');
      });
      this.load.start();
    });
  }
}
