import 'phaser';
import MoveTo from 'phaser3-rex-plugins/plugins/moveto.js';

import {
  map_height,
  map_width,
  viewport_height,
  viewport_width,
} from '../constants';
import { CARD_SET } from '../constants/cards';
import { map_center } from '../constants/coords';
import { avatar_step, land, select_player } from '../game/logic';
import { process_events } from '../game/render';

export class Main_scene extends Phaser.Scene {
  panning: { origin_x: number; origin_y: number } = null;
  avatar_move: MoveTo = null;
  starting_pointers_distance: number;

  constructor () {
    super('Main');
  }

  preload() {
    this.load.image('map', 'assets/map.jpg');
    this.load.image('mother', 'assets/avatars/mother.png');
    this.load.image('child', 'assets/avatars/child.png');
    this.load.image('melchisedech', 'assets/avatars/melchisedech.png');
    select_player();
  }

  create() {
    const me = this;
    me.cam().setBounds(0, 0, map_width, map_height);
    me.cam().setScroll(map_center.x - viewport_width / 2, map_center.y - viewport_height / 2);
    me.cam().setBackgroundColor('#FFFFFF');

    me.input.addPointer();

    me.add.image(0, 0, 'map').setOrigin(0);

    me.input.on('pointerdown', (pointer: Phaser.Input.Pointer, objects) => {
      me.check_pointers_distance();
      if (objects.length > 0) {
        return;
      }
      me.panning = {
        origin_x: pointer.downX + me.cam().scrollX,
        origin_y: pointer.downY + me.cam().scrollY,
      };
    });
    me.input.on('pointermove', (evt) => {
      if (me.input.pointer2.isDown) {
        me.handle_pinch();
      }
      else {
        me.handle_mouse_move(evt);
      }
    });
    me.input.on('wheel', (pointer, objs, dx, dy, dz) => this.handle_mousewheel(pointer, objs, dx, dy, dz));
  }

  update() {
    process_events();
  }

  setup_avatar(deck: CARD_SET) {
    const me = this;
    const avatar = me.add.sprite(map_center.x, map_center.y, deck);
    avatar.setScale(0.3);
    avatar.setInteractive();
    me.input.setDraggable(avatar);
    me.avatar_move = new MoveTo(avatar);
    me.avatar_move.on('complete', land);
    avatar.on('pointerdown', () => {
      avatar_step();
    });
  }

  cam() {
    return this.cameras.main;
  }

  get_pointers_distance(): number {
    if (this.input.pointer1.isDown && this.input.pointer2.isDown) { /* OK */ } else return null;
    const {position: {x: x1, y: y1}} = this.input.pointer1;
    const {position: {x: x2, y: y2}} = this.input.pointer2;
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  }

  check_pointers_distance() {
    if (this.input.pointer2.isDown) {
      this.starting_pointers_distance = this.get_pointers_distance();
    }
  }

  handle_mouse_move(evt) {
    const pointer = this.input.activePointer;
    if (this.panning && !pointer.isDown) {
      this.panning = null;
    }
    if (!this.panning) {
      return;
    }
    const pos = evt.position;
    const dx = this.panning.origin_x - pos.x;
    const dy = this.panning.origin_y - pos.y;
    this.cam().scrollX = dx;
    this.cam().scrollY = dy;
  }

  handle_pinch() {
    const delta = this.starting_pointers_distance - this.get_pointers_distance()
    this.zoom(delta / 1000);
  }

  handle_mousewheel(pointer, objs, dx, dy, dz) {
    this.zoom(dy / 100);
  }

  zoom(delta) {
    const new_zoom = this.cam().zoom * (1 - delta / 10);
    const min_h = viewport_height / map_height;
    const min_w = viewport_width / map_width;
    const min_zoom = Math.max(new_zoom, Math.min(min_h, min_w));
    const max_zoom = 1;
    const clamped_new_zoom = Math.min(Math.max(new_zoom, min_zoom), max_zoom);
    this.cam().setZoom(clamped_new_zoom);
  }
}
