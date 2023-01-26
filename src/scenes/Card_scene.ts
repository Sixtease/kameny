import 'phaser';

import { GlobalCard, get_card_key } from '../constants/cards';
import { golden_ratio, viewport_center, viewport_width } from '../constants';
import {
  Game_event,
  find_event_backward,
  is_Pick_cards,
  is_Present_cards,
} from '../game/events';

interface ImageObj { key: string; url: string }
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
    this.cam().setBackgroundColor('rgba(255,255,255,0.8)');
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
    this.label.destroy();
    resolve(card);
  }

  load_card_image(key: string): Phaser.GameObjects.Sprite {
    const me = this;
    const sprite = me.add.sprite(viewport_center.x, viewport_center.y, key);
    sprite.setInteractive();
    sprite.setScale(0.2);
    return sprite;
  }

  show_images<T extends ImageObj>(options: T[], label_text: string): Promise<(LoadedImageObj & T)[]> {
    const me = this;
    return new Promise<(LoadedImageObj & T)[]>((resolve, reject) => {
      me.initialize();
      me.load.image(options);

      me.label = this.add.text(
        viewport_center.x / 2, 20, label_text, {
          color: 'black',
          align: 'left',
          fontSize: '30px',
          strokeThickness: 4,
          shadow: {
            offsetX: 0, offsetY: 0, color: 'white', blur: 2, stroke: true, fill: true,
          },
        }
      );

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

    const event = find_event_backward((evt: Game_event) => is_Present_cards(evt) || is_Pick_cards(evt));
    const label_text
      = !event                                                   ? ''
      : is_Present_cards(event)                                  ? 'Vyber si kartu.'
      : is_Pick_cards(event) && event.payload.cards.length === 1 ? "Dostal's tuto kartu."
      :                                                            "Dostal's tyto karty."
    ;

    return new Promise<GlobalCard>((resolve, reject) => {
      me.show_images(image_opts, label_text).then((loaded_images) => {
        loaded_images.forEach(
          loaded_image => loaded_image.sprite.on(
            'pointerup',
            () => me.handle_card_click(
              { set: loaded_image.set, id: loaded_image.id },
              resolve
            )
          )
        );
      });
    });
  }
}
