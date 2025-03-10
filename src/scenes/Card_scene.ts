import 'phaser';

import { CARD_SET, GlobalCard, get_card_key } from '../constants/cards';
import { golden_ratio, max_card_size, viewport_center, viewport_width } from '../constants';
import {
  Game_event,
  find_event_backward,
  is_Pick_cards,
  is_Present_cards,
} from '../game/events';
import { card_detail } from '../templates/card-detail';
import { pick_card } from '../templates/pick-card';
import { pick_cards } from '../templates/pick-cards';

export interface ImageObj { key: string; url: string }
interface LoadedImageObj extends ImageObj {
  sprite: Phaser.GameObjects.Sprite;
}

function get_radius() {
  const r = Math.min(viewport_center.x, viewport_center.y);
  return r / golden_ratio;
}

export class Card_scene extends Phaser.Scene {
  constructor () {
    super('Cards');
  }

  label: Phaser.GameObjects.Text;
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
    this.cam().setBackgroundColor('rgba(255,255,255,0.95)');
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

  switch_off() {
    if (!this.group) return;
    this.group.clear(true, true);
    this.scene.setActive(false);
    this.scene.sendToBack();
    this.scene.setVisible(false);
    this.scene.wake('Main');
    this.scene.wake('Drawn_cards');
    this.scene.wake('Controls');
    this.label.destroy();
  }

  load_card_image(key: string): Phaser.GameObjects.Sprite {
    const me = this;
    const sprite = me.add.sprite(viewport_center.x, viewport_center.y, key);
    sprite.setInteractive({ cursor: 'pointer' });
    return sprite;
  }

  get_card_scale(card_count: number): number {
    if (card_count === 1) return 2 * get_radius() / max_card_size;
    if (card_count === 2) return 2 * get_radius() / max_card_size;
    return Math.sqrt(2) * Math.PI * get_radius() / (card_count * max_card_size);
  }

  show_images<T extends ImageObj>(options: T[], label_text: string): Promise<(LoadedImageObj & T)[]> {
    const me = this;
    return new Promise<(LoadedImageObj & T)[]>((resolve) => {
      me.initialize();
      me.load.image(options);

      me.label = this.add.text(
        viewport_center.x, 20, label_text, {
          color: 'black',
          align: 'left',
          fontSize: 'calc(min(7vw, 30px))',
          strokeThickness: 4,
          shadow: {
            offsetX: 0, offsetY: 0, color: 'white', blur: 2, stroke: true, fill: true,
          },
        }
      ).setOrigin(0.5, 0);

      me.load.once('complete', function on_load() {
        const loaded_ok = options.every(img => me.textures.list[img.key]);
        if (!loaded_ok) {
          setTimeout(on_load, 100);
          return;
        }
        me.mkgroup();
        const loadedImages: (LoadedImageObj & T)[] = [];
        options.forEach(img => {
          const sprite = me.load_card_image(img.key);
          sprite.setScale(me.get_card_scale(options.length));
          me.group!.add(sprite);
          loadedImages.push({ ...img, sprite });
        });
        if (options.length === 1) {
          Phaser.Actions.PlaceOnLine(me.group!.getChildren(), me.line);
        }
        else {
          Phaser.Actions.PlaceOnCircle(me.group!.getChildren(), me.circle);
        }
        me.scene.setActive(true);
        me.scene.bringToTop();
        me.scene.setVisible(true);
        me.scene.pause('Main');
        me.scene.pause('Drawn_cards');
        me.scene.pause('Controls');
        me.scene.wake('Cards');
        resolve(loadedImages);
      });
      me.load.start();
    });
  }

  show_cards(cards: GlobalCard[]): Promise<GlobalCard> {
    const me = this;

    const image_opts = cards.map(card => ({
      key: get_card_key(card.set, card.id),
      url: `assets/cards/${card.set}/${card.id}.jpg`,
      ...card,
    }));

    const discriminator = (evt: Game_event): evt is Game_event => is_Present_cards(evt) || is_Pick_cards(evt);
    const event = find_event_backward(discriminator);

    if (is_Pick_cards(event)) {
      // for drawn cards scene to access the card's texture
      me.load.image(image_opts);
      me.load.start();

      if (event.payload.cards.length === 1) {
        const [card] = cards;
        return new Promise<GlobalCard>((resolve) => {
          pick_card({
            url: `assets/cards/${card.set}/${card.id}.jpg`,
            card_id: card.id,
            on_close: () => resolve(card),
          });
        });
      }
      else {
        return new Promise<GlobalCard>((resolve) => {
          pick_cards({ cards });
        });
      }
    }

    return new Promise<GlobalCard>((resolve, reject) => {
      me.show_images(image_opts, 'Vyber si kartu.').then((loaded_images) => {
        loaded_images.forEach(
          loaded_image => {
            loaded_image.sprite.on(
              'pointerup', () => {
                card_detail({
                  url: loaded_image.url,
                  card_id: loaded_image.id,
                  on_accept: () => {
                    me.switch_off();
                    resolve({ set: loaded_image.set, id: loaded_image.id });
                  },
                });
              }
            );
          }
        );
      });
    });
  }

  show_avatars(): Promise<CARD_SET> {
    const me = this;
    const avatars: { key: CARD_SET; url: string }[] = Object.keys(CARD_SET).map(
      key => {
        return {
          key: key as CARD_SET,
          url: `assets/avatars/${key}.png`,
        };
      }
    );
    return new Promise<CARD_SET>((resolve) => {
      me.show_images(avatars, 'Vyber si hrací kámen.').then(loaded_images => {
        loaded_images.forEach(({ sprite, key }) => {
          sprite.on(
            'pointerup', () => {
              me.switch_off();
              resolve(key);
            }
          );
          sprite.setScale(0.5);
        });
      });
    });
  }
}
