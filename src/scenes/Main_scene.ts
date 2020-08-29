import 'phaser';

import {
  map_center,
  map_height,
  map_width,
  viewport_height,
  viewport_width,
} from '../constants';

export class Main_scene extends Phaser.Scene {
  panning = false;
  panning_origin_x: null | number = null;
  panning_origin_y: null | number = null;

  constructor () {
    super('demo');
  }

  cam() {
    return this.cameras.main;
  }

  preload() {
    this.load.image('map', 'assets/map.jpg');
  }

  create() {
    this.cam().setBounds(0, 0, map_width, map_height);
    this.cam().setScroll(map_center.x - viewport_width / 2, map_center.y - viewport_height / 2);
    this.cam().setBackgroundColor('#FFFFFF');

    const map = this.add.image(0, 0, 'map').setOrigin(0);

    this.input.on('pointerdown', (pointer) => {
      this.panning = true;
      this.panning_origin_x = pointer.downX + this.cam().scrollX;
      this.panning_origin_y = pointer.downY + this.cam().scrollY;
    });
    this.input.on('pointermove', (evt) => this.handle_mouse_move(evt));
    this.input.on('wheel', (pointer, objs, dx, dy, dz) => this.handle_mousewheel(pointer, objs, dx, dy, dz));
  }

  handle_mouse_move(evt) {
    const pointer = this.input.activePointer;
    if (this.panning && !pointer.isDown) {
      this.panning = false;
      this.panning_origin_x = null;
      this.panning_origin_y = null;
    }
    if (!this.panning) {
      return;
    }
    const pos = evt.position;
    const dx = this.panning_origin_x - pos.x;
    const dy = this.panning_origin_y - pos.y;
    this.cam().scrollX = dx;
    this.cam().scrollY = dy;
  }

  handle_mousewheel(pointer, objs, dx, dy, dz) {
    this.zoom(dy);
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
