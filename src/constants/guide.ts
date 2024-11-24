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

const death_gate_name_list = [
  'síla',
  'otevřenost',
  'klid',
  'přijímání',
  'sebevědomí',
  'vhled (prohloubení)',
  'poznání',
];

export const birth_gate_names = Object.fromEntries(birth_gate_name_list.map((name, index) => [gates[index], name]));
export const death_gate_names = Object.fromEntries(death_gate_name_list.map((name, index) => [gates[index], name]));
