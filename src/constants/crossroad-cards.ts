import { CARD_SET } from './cards';
import { Crossroad_name, crossroads } from './places';

export type Mother_crossroad_card =
  | 'tourmaline_schort'
  | 'rose_quartz'
  | 'gypsum'
  | 'agate_b'
  | 'hiddenite'
  | 'moldavite_b'
  | 'gold'
  | 'sodalite'
  | 'larimar_a'
  | 'diamond'
  | 'carnelian'
  | 'copper';

const mother_crossroad_cards: Mother_crossroad_card[] = [
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

const mother_crossroad_card: Record<Crossroad_name, Mother_crossroad_card> = mother_crossroad_cards.reduce<Record<Crossroad_name, Mother_crossroad_card>>(
  (acc, cur, i) => ({...acc, [crossroads[i]]: cur}),
  {} as Record<Crossroad_name, Mother_crossroad_card>
);

export type Child_crossroad_card =
 |  'silver'
 |  'fluorite_b'
 |  'amber'
 |  'czech_garnet_a'
 |  'citrine'
 |  'emerald'
 |  'libyan_desert_glass_d'
 |  'aquamarine'
 |  'tourmaline_b'
 |  'heliotrope'
 |  'alexandrite'
 |  'pearl';

const child_crossroad_cards: Child_crossroad_card[] = [
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
  'alexandrite',
  'pearl',
];

const child_crossroad_card: Record<Crossroad_name, Child_crossroad_card> = child_crossroad_cards.reduce<Record<Crossroad_name, Child_crossroad_card>>(
  (acc, cur, i) => ({...acc, [crossroads[i]]: cur}),
  {} as Record<Crossroad_name, Child_crossroad_card>
);

export type Melchisedech_crossroad_card =
  | 'jasper_k'
  | 'sardonyx'
  | 'labradorite'
  | 'salt'
  | 'sunstone'
  | 'crystal_a'
  | 'apophyllite'
  | 'sapphire'
  | 'rhodonite'
  | 'darwin_glass_b'
  | 'libyan_desert_glass_b'
  | 'obsidian';

const melchisedech_crossroad_cards: Melchisedech_crossroad_card[] = [
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

const melchisedech_crossroad_card: Record<Crossroad_name, Melchisedech_crossroad_card> = melchisedech_crossroad_cards.reduce<Record<Crossroad_name, Melchisedech_crossroad_card>>(
  (acc, cur, i) => ({...acc, [crossroads[i]]: cur}),
  {} as Record<Crossroad_name, Melchisedech_crossroad_card>
);

export type Crossroad_card = Mother_crossroad_card | Child_crossroad_card | Melchisedech_crossroad_card;

export enum CROSSROAD_CARD_SET {
  mother = 'crossroads/mother',
  child = 'crossroads/child',
  melchisedech = 'crossroads/melchisedech',
};

export const set_to_crossroad_set: Record<CARD_SET, CROSSROAD_CARD_SET> = {
  [CARD_SET.mother      ]: CROSSROAD_CARD_SET.mother,
  [CARD_SET.child       ]: CROSSROAD_CARD_SET.child,
  [CARD_SET.melchisedech]: CROSSROAD_CARD_SET.melchisedech,
};

export const crossroad_card_by_set: Record<CARD_SET, Record<Crossroad_name, Crossroad_card>> = {
  [CARD_SET.mother      ]: mother_crossroad_card,
  [CARD_SET.child       ]: child_crossroad_card,
  [CARD_SET.melchisedech]: melchisedech_crossroad_card,
};
