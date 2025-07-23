import 'phaser';
import MoveTo from 'phaser3-rex-plugins/plugins/moveto.js';

import {
  world_height,
  world_width,
  viewport_height,
  viewport_width,
  minimum_initial_world_display,
} from '../constants';
import { CARD_SET } from '../constants/cards';
import { Coord, world_center } from '../constants/coords';
import { avatar_step, land, select_player } from '../game/logic';
import { process_events } from '../game/render';

export class Main_scene extends Phaser.Scene {
  panning: { scroll: Coord; pointer: Coord } = null;
  avatar_move: MoveTo = null;
  starting_pointers_distance: number;
  avatar: Phaser.GameObjects.Sprite;

  constructor () {
    super('Main');
  }

  preload() {
    this.load.image('world', 'assets/world.jpg');
    this.load.image('mother', 'assets/avatars/mother.png');
    this.load.image('child', 'assets/avatars/child.png');
    this.load.image('melchisedech', 'assets/avatars/melchisedech.png');
    select_player();
  }

  create() {
    const me = this;
    // me.cam().setBounds(0, 0, world_width, world_height);
    me.cam().setScroll(world_center.x - viewport_width / 2, world_center.y - viewport_height / 2);
    me.cam().setBackgroundColor('#FFFFFF');

    me.input.addPointer();

    me.add.image(0, 0, 'world').setOrigin(0);

    if (viewport_width < minimum_initial_world_display.w || viewport_height < minimum_initial_world_display.h) {
      me.cam().setZoom(Math.min(viewport_width / minimum_initial_world_display.w, viewport_height / minimum_initial_world_display.h));
    }

    me.input.on('pointerdown', (pointer: Phaser.Input.Pointer, objects) => {
      me.check_pointers_distance();
      if (objects.length > 0) {
        return;
      }
      me.panning = {
        scroll: { x: me.cam().scrollX, y: me.cam().scrollY },
        pointer: { x: pointer.x, y: pointer.y },
      };
    });
    me.input.on('pointermove', (evt, objects) => {
      if (me.input.pointer2.isDown) {
        me.handle_pinch();
      }
      else {
        if (objects.length > 0) {
          return;
        }
        me.handle_mouse_move(evt);
      }
    });
    me.input.on('wheel', (pointer, objs, dx, dy, dz) => this.handle_mousewheel(pointer, objs, dx, dy, dz));

    window.addEventListener('resize', () => this.handle_resize());
  }

  update() {
    process_events();
  }

  setup_avatar(deck: CARD_SET) {
    const me = this;
    const avatar = me.add.sprite(world_center.x, world_center.y, deck);
    me.avatar = avatar;
    avatar.setScale(0.3);
    avatar.setInteractive({ cursor: 'pointer' });
    me.input.setDraggable(avatar);
    me.avatar_move = new MoveTo(avatar);
    me.avatar_move.on('complete', land);
    avatar.on('pointerdown', () => {
      avatar_step();
    });
  }

  move_avatar(dest: Coord): void {
    const cam = this.cam();
    const avatar = this.avatar;
    const avatar_move = this.avatar_move;

    if (!cam.worldView.contains(avatar.x, avatar.y)) {
      cam.pan(avatar.x, avatar.y, 300, 'Cubic', false, (_, done) => {
        if (done === 1) {
          avatar_move.moveTo(dest.x, dest.y);
        }
      });
    }
    else {
      avatar_move.moveTo(dest.x, dest.y);
    }
  }

  instant_move_avatar(dest: Coord): void {
    const avatar = this.avatar;
    avatar.x = dest.x;
    avatar.y = dest.y;
    this.cam().pan(avatar.x, avatar.y, 300, 'Cubic', false);
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
    const me = this;
    const cam = me.cam();
    const pointer = me.input.activePointer;
    if (me.panning && !pointer.isDown) {
      me.panning = null;
    }
    if (!me.panning) {
      return;
    }
    const pos = evt.position;
    const viewport_delta = {
      x: me.panning.pointer.x - pos.x,
      y: me.panning.pointer.y - pos.y,
    };
    const world_delta = {
      x: viewport_delta.x / cam.zoom,
      y: viewport_delta.y / cam.zoom,
    };
    const new_scroll = { x: me.panning.scroll.x + world_delta.x, y: me.panning.scroll.y + world_delta.y };
    this.scrollTo(new_scroll);
  }

  handle_pinch() {
    const delta = this.starting_pointers_distance - this.get_pointers_distance()
    this.zoom(delta / 20);
  }

  handle_mousewheel(pointer, objs, dx, dy, dz) {
    const me = this;
    const cam = me.cam();
    // Get the current world point under pointer.
    const world_pivot = cam.getWorldPoint(pointer.x, pointer.y);
    
    me.zoom(dy);

    // Update camera matrix, so `getWorldPoint` returns zoom-adjusted coordinates.
    // @ts-ignore
    cam.preRender();
    const moved_world_pivot = cam.getWorldPoint(pointer.x, pointer.y);
    // Scroll the camera to keep the pointer under the same world point.
    me.scrollBy({
      x: world_pivot.x - moved_world_pivot.x,
      y: world_pivot.y - moved_world_pivot.y,
    });
  }

  zoom(delta: number) {
    const new_zoom = this.cam().zoom * (1 - delta / 1000);
    const min_h = viewport_height / world_height;
    const min_w = viewport_width / world_width;
    const min_zoom = Math.max(new_zoom, Math.min(min_h, min_w));
    const max_zoom = 1;
    const clamped_new_zoom = Math.min(Math.max(new_zoom, min_zoom), max_zoom);
    this.cam().setZoom(clamped_new_zoom);
  }

  scrollTo(coord: Coord) {
    const zoom = this.cam().zoom;

    const old = {
      x: this.cam().scrollX,
      y: this.cam().scrollY,
    };

    const delta = {
      x: coord.x - old.x,
      y: coord.y - old.y,
    };

    const nw = this.cam().getWorldPoint(0 + delta.x, 0 + delta.y);
    const se = this.cam().getWorldPoint(viewport_width + delta.x, viewport_height + delta.y);

    const correction = { x: 0, y: 0 };
    if (world_width * zoom < viewport_width) {
      if (nw.x > 0 && se.x > world_width) {
        correction.x = -nw.x * zoom;
      }
      if (se.x < world_width && nw.x < 0) {
        correction.x = (world_width - se.x) * zoom;
      }
    }
    else {
      if (nw.x < 0) {
        correction.x = -nw.x * zoom;
      }
      if (se.x > world_width) {
        correction.x = (world_width - se.x) * zoom;
      }
    }
    if (world_height * zoom < viewport_height) {
      if (nw.y > 0 && se.y > world_height) {
        correction.y = -se.y * zoom;
      }
      if (se.y < world_height && nw.y < 0) {
        correction.y = (world_height - se.y) * zoom;
      }
    }
    else {
      if (nw.y < 0) {
        correction.y = -nw.y * zoom;
      }
      if (se.y > world_height) {
        correction.y = (world_height - se.y) * zoom;
      }
    }

    const clamped = {
      x: coord.x + correction.x,
      y: coord.y + correction.y,
    };

    this.cam().scrollX = clamped.x;
    this.cam().scrollY = clamped.y;
  }

  scrollBy(delta: Coord) {
    this.scrollTo({
      x: this.cam().scrollX + delta.x,
      y: this.cam().scrollY + delta.y,
    });
  }

  handle_resize() {
    const me = this;
    const cam = me.cam();
    const { avatar } = me;
    
    // Get new viewport size
    const new_width = window.innerWidth;
    const new_height = window.innerHeight;
    console.log('resize', new_width, new_height);
    
    // Update camera viewport
    cam.setViewport(0, 0, new_width, new_height);
    cam.setBounds(0, 0, new_width, new_height);

    // Adjust zoom if necessary
    const min_h = new_height / world_height;
    const min_w = new_width / world_width;
    const min_zoom = Math.min(min_h, min_w);
    const max_zoom = 1;
    cam.setZoom(Math.max(cam.zoom, min_zoom, max_zoom));

    // Recenter camera if needed
    cam.centerOn(avatar.x, avatar.y);
  }
}
