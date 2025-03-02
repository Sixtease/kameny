import 'phaser';

import { avatar_step } from '../game/logic';
import { step_button_layout_breakpoint, viewport_width, viewport_height } from '../constants';

export class Controls_scene extends Phaser.Scene {
  constructor () {
    super({ key: 'Controls', active: true });
  }

  preload() {
    this.load.image('step_button', 'assets/ui/step-button.png');
  }

  create() {
    const narrow_viewport = viewport_width < step_button_layout_breakpoint;
    const step_button_x = narrow_viewport ? 0 : viewport_width / 2;
    const step_button_y = narrow_viewport ? viewport_height : viewport_height - 60;
    const step_button_origin = narrow_viewport ? [0, 1] : [0.5, 1];
    const step_button = this.add.sprite(step_button_x, step_button_y, 'step_button').setOrigin(...step_button_origin);
    step_button.setInteractive({ cursor: 'pointer' });
    step_button.on('pointerdown', () => {
      avatar_step();
    });
  }
}
