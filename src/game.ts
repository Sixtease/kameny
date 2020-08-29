import 'phaser';

import './game.scss';

import { map_width, map_height, map_center } from './constants';
const viewport_width = window.innerWidth;
const viewport_height = window.innerHeight;

export default class Main_scene extends Phaser.Scene {
  panning = false;
  panning_origin_x: null | number = null;
  panning_origin_y: null | number = null;

  constructor () {
    super('demo');
  }

  preload() {
    this.load.image('map', 'assets/map.jpg');
  }

  create() {
    const camera = this.cameras.main;
    camera.setBounds(0, 0, map_width, map_height);
    camera.setScroll(map_center.x - viewport_width / 2, map_center.y - viewport_height / 2);

    const map = this.add.image(0, 0, 'map').setOrigin(0);

    this.input.on('pointerdown', (pointer) => {
      this.panning = true;
      this.panning_origin_x = pointer.downX + camera.scrollX;
      this.panning_origin_y = pointer.downY + camera.scrollY;
    });
    this.input.on('pointermove', (evt) => this.handle_mouse_move(evt));
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
    this.cameras.main.scrollX = dx;
    this.cameras.main.scrollY = dy;
  }
}

const config = {
  type: Phaser.AUTO,
  width: viewport_width,
  height: viewport_height,
  scene: Main_scene,
};

const game = new Phaser.Game(config);
