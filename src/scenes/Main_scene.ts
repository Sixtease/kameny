import 'phaser';
import MoveTo from 'phaser3-rex-plugins/plugins/moveto.js';

import {
  map_height,
  map_width,
  viewport_height,
  viewport_width,
} from '../constants';
import { map_center } from '../constants/coords';
import { avatar_step, land, select_player } from '../game/logic';
import { process_events } from '../game/render';

export class Main_scene extends Phaser.Scene {
  panning: { origin_x: number; origin_y: number } = null;
  avatar_move: MoveTo = null;

  constructor () {
    super('Main');
  }

  preload() {
    this.load.image('map', 'assets/map.jpg');
    this.load.image('avatar', 'assets/avatars/mother.png');
    select_player();
  }

  create() {
    this.cam().setBounds(0, 0, map_width, map_height);
    this.cam().setScroll(map_center.x - viewport_width / 2, map_center.y - viewport_height / 2);
    this.cam().setBackgroundColor('#FFFFFF');

    this.add.image(0, 0, 'map').setOrigin(0);
    this.setup_avatar();

    this.input.on('pointerdown', (pointer, objects) => {
      if (objects.length > 0) {
        return;
      }
      this.panning = {
        origin_x: pointer.downX + this.cam().scrollX,
        origin_y: pointer.downY + this.cam().scrollY,
      };
    });
    this.input.on('pointermove', (evt) => this.handle_mouse_move(evt));
    this.input.on('wheel', (pointer, objs, dx, dy, dz) => this.handle_mousewheel(pointer, objs, dx, dy, dz));
  }

  update() {
    process_events();
  }

  setup_avatar() {
    const avatar = this.add.sprite(map_center.x, map_center.y, 'avatar');
    avatar.setScale(0.3);
    avatar.setInteractive();
    this.input.setDraggable(avatar);
    this.avatar_move = new MoveTo(avatar);
    this.avatar_move.on('complete', land);
    avatar.on('pointerup', () => {
      avatar_step();
    });
  }

  cam() {
    return this.cameras.main;
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
