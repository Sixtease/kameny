import { CARD_SET, Card } from './cards';
import { Crossroad_name, crossroads } from './places';

const mother_crossroad_cards: Card[] = [
  'tourmaline_schort',
  'rose_quartz',
  'gypsum',
  'agate_b',
  'hiddenite',
  'moldavite_b',
  'gold',
  'sodalite',
  'larimar_a',
  'diamond',
  'carnelian',
  'copper',
];

const mother_crossroad_card: Record<Crossroad_name, Card> = mother_crossroad_cards.reduce<Record<Crossroad_name, Card>>(
  (acc, cur, i) => ({...acc, [crossroads[i]]: cur}),
  {} as Record<Crossroad_name, Card>
);

const child_crossroad_cards: Card[] = [
  'silver',
  'fluorite_b',
  'amber',
  'czech_garnet_a',
  'citrine',
  'emerald',
  'libyan_desert_glass_d',
  'aquamarine',
  'tourmaline_b',
  'heliotrope',
  'moldavite_c',
  'moonstone_c',
];

const child_crossroad_card: Record<Crossroad_name, Card> = child_crossroad_cards.reduce<Record<Crossroad_name, Card>>(
  (acc, cur, i) => ({...acc, [crossroads[i]]: cur}),
  {} as Record<Crossroad_name, Card>
);

const melchisedech_crossroad_cards: Card[] = [
  'jasper_k',
  'sardonyx',
  'labradorite',
  'salt',
  'sunstone',
  'crystal_a',
  'apophyllite',
  'sapphire',
  'rhodonite',
  'darwin_glass_b',
  'libyan_desert_glass_b',
  'obsidian',
];

const melchisedech_crossroad_card: Record<Crossroad_name, Card> = melchisedech_crossroad_cards.reduce<Record<Crossroad_name, Card>>(
  (acc, cur, i) => ({...acc, [crossroads[i]]: cur}),
  {} as Record<Crossroad_name, Card>
);

export const set_crossroad_card: Record<CARD_SET, Record<Crossroad_name, Card>> = {
  [CARD_SET.mother      ]: mother_crossroad_card,
  [CARD_SET.child       ]: child_crossroad_card,
  [CARD_SET.melchisedech]: melchisedech_crossroad_card,
};
