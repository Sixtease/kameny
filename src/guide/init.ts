import { avatar_choice } from './avatar-choice';
import { update_guide } from './lookup';

function init_guide() {
  if ((window as any).GUIDE_INITIALIZED) return;
  const gsw = document.getElementById('guide-switch');
  gsw.addEventListener('click', () => document.getElementById('guide-container').classList.toggle('guide-on'));
  gsw.addEventListener('mousedown', (evt) => evt.stopPropagation());
  gsw.addEventListener('mouseup', (evt) => evt.stopPropagation());
  (window as any).GUIDE_INITIALIZED = true;
}

export function init_guide_off() {
  init_guide();
  document.getElementById('guide-container').classList.replace('guide-container--uninitialized', 'guide-off');
  update_guide();
}

export function start_guide() {
  init_guide();
  document.getElementById('guide-container').classList.replace('guide-container--uninitialized', 'guide-on');
  avatar_choice();
}
