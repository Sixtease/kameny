export const world_width = 3796;
export const world_height = world_width;
export const viewport_width = window.visualViewport?.width ?? window.innerWidth;
export const viewport_height = window.visualViewport?.height ?? window.innerHeight;
export const viewport_center = { x: viewport_width / 2, y: viewport_height / 2 };
export const golden_ratio = 1.61803398875;
export const max_card_size = 1167;
export const second = 1000;
export const step_button_layout_breakpoint = 550;
export const minimum_initial_world_display = { w: 1510, h: 1260 };

export const firebaseConfig = {
  apiKey: "AIzaSyDPr6i0xdtdD6Hc_ijtkLpiO4ZOP5aRri8",
  authDomain: "kameny-game.firebaseapp.com",
  projectId: "kameny-game",
  storageBucket: "kameny-game.firebasestorage.app",
  messagingSenderId: "1025460056191",
  appId: "1:1025460056191:web:99e73fc9e24fcf3456cf4a"
};
