import 'phaser';

import { avatar_step } from '../game/logic';
import { viewport_width, viewport_height } from '../constants';

export class Controls_scene extends Phaser.Scene {
  constructor () {
    super({ key: 'Controls', active: true });
  }

  preload() {
    this.load.image('step_button', 'assets/step-button.png');
  }

  create() {
    const step_button = this.add.sprite(viewport_width / 2, viewport_height - 60, 'step_button').setOrigin(0.5, 1);
    step_button.setInteractive({ cursor: 'pointer' });
    step_button.on('pointerdown', () => {
      avatar_step();
    });
  }
}
