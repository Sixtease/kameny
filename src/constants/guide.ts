import { gates } from './places';

const birth_gate_name_list = [
  'odvaha',
  'staženost (skrytost)',
  'rychlost, aktivita',
  'očekávání',
  'oslabení (nemoc)',
  'povrchnost a chtění',
  'hledání tajemství',
];

export const birth_gate_names = Object.fromEntries(birth_gate_name_list.map((name, index) => [gates[index], name]));
