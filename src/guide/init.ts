import { avatar_choice } from './avatar-choice';

export function init_guide() {
  if ((window as any).GUIDE_INITIALIZED) return;
  const gsw = document.getElementById('guide-switch');
  gsw.addEventListener('click', () => document.getElementById('guide-container').classList.toggle('guide-on'));
  gsw.addEventListener('mousedown', (evt) => evt.stopPropagation());
  gsw.addEventListener('mouseup', (evt) => evt.stopPropagation());
  document.getElementById('guide-container').classList.replace('guide-container--uninitialized', 'guide-on');
  (window as any).GUIDE_INITIALIZED = true;

  avatar_choice();
}
