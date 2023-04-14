export type Mother_card = 
  | 'amazonite'
  | 'amber'
  | 'aquamarine'
  | 'aragonite'
  | 'beryl'
  | 'charoite'
  | 'chrysolite'
  | 'chrysoprase'
  | 'citrine'
  | 'coral'
  | 'crystal_a'
  | 'czech_garnet_a'
  | 'fluorite_a'
  | 'heliodor'
  | 'hematite'
  | 'jade'
  | 'jasper_k'
  | 'labradorite'
  | 'larimar_c'
  | 'libyan_desert_glass_c'
  | 'malachite'
  | 'moldavite_a'
  | 'moonstone_a'
  | 'moqui_marble_female'
  | 'onyx'
  | 'pearl'
  | 'philippinite'
  | 'precious_opal'
  | 'ruby'
  | 'salt'
  | 'snake_agate'
  | 'spinel'
  | 'topaz'
  | 'tourmaline_b'
  | 'turquoise'
  | 'zircon';

export const mother: Mother_card[] = [
  'amazonite',
  'amber',
  'aquamarine',
  'aragonite',
  'beryl',
  'charoite',
  'chrysolite',
  'chrysoprase',
  'citrine',
  'coral',
  'crystal_a',
  'czech_garnet_a',
  'fluorite_a',
  'heliodor',
  'hematite',
  'jade',
  'jasper_k',
  'labradorite',
  'larimar_c',
  'libyan_desert_glass_c',
  'malachite',
  'moldavite_a',
  'moonstone_a',
  'moqui_marble_female',
  'onyx',
  'pearl',
  'philippinite',
  'precious_opal',
  'ruby',
  'salt',
  'snake_agate',
  'spinel',
  'topaz',
  'tourmaline_b',
  'turquoise',
  'zircon',
];

export type Child_card = 
  | 'agate_b'
  | 'amethyst'
  | 'apophyllite'
  | 'aquamarine_b'
  | 'azurite'
  | 'calcite'
  | 'chalcedony'
  | 'crystal_b'
  | 'cyanide'
  | 'czech_garnet_b'
  | 'darwin_glass_b'
  | 'diamond'
  | 'dioptase'
  | 'gold'
  | 'hiddenite'
  | 'jasper'
  | 'lapis_lazuli'
  | 'larimar_a'
  | 'larimar_b'
  | 'lepidolite'
  | 'libyan_desert_glass_a'
  | 'libyan_desert_glass_b'
  | 'magnetit'
  | 'mogui_marble_male'
  | 'moldavite_b'
  | 'obsidian'
  | 'olivine'
  | 'opal'
  | 'rhodochrosite'
  | 'rhodonite'
  | 'sapphire'
  | 'sardonyx'
  | 'smoky_quartz'
  | 'sphalerite'
  | 'sunstone'
  | 'tanzanite'
  | 'tigers_eye';

export const child: Child_card[] = [
  'agate_b',
  'amethyst',
  'apophyllite',
  'aquamarine_b',
  'azurite',
  'calcite',
  'chalcedony',
  'crystal_b',
  'cyanide',
  'czech_garnet_b',
  'darwin_glass_b',
  'diamond',
  'dioptase',
  'gold',
  'hiddenite',
  'jasper',
  'lapis_lazuli',
  'larimar_a',
  'larimar_b',
  'lepidolite',
  'libyan_desert_glass_a',
  'libyan_desert_glass_b',
  'magnetit',
  'mogui_marble_male',
  'moldavite_b',
  'obsidian',
  'olivine',
  'opal',
  'rhodochrosite',
  'rhodonite',
  'sapphire',
  'sardonyx',
  'smoky_quartz',
  'sphalerite',
  'sunstone',
  'tanzanite',
  'tigers_eye',
];

export type Melchisedech_card =
  | 'agate_a'
  | 'agate_c'
  | 'alexandrite'
  | 'andalusite'
  | 'antimonite'
  | 'carnelian'
  | 'celestite'
  | 'chrysocolla'
  | 'cinnabar'
  | 'copper'
  | 'crystal_c_sri_lanka'
  | 'cuprite'
  | 'darwin_glass_a'
  | 'emerald'
  | 'ferrous_meteorite'
  | 'fluorite_b'
  | 'gypsum'
  | 'heliotrope'
  | 'indochinite'
  | 'kunzite'
  | 'larimar_b'
  | 'libyan_desert_glass_d'
  | 'meteorite_1_chelyabinsk'
  | 'meteorite_pallasite'
  | 'moldavite_d'
  | 'moonstone_b'
  | 'morganite'
  | 'orpiment'
  | 'pyrite'
  | 'rose_quartz'
  | 'sagenite_a'
  | 'sagenite_b'
  | 'silver'
  | 'sodalite'
  | 'tourmaline_rubellite'
  | 'tourmaline_schort';

export const melchisedech: Melchisedech_card[] = [
  'agate_a',
  'agate_c',
  'alexandrite',
  'andalusite',
  'antimonite',
  'carnelian',
  'celestite',
  'chrysocolla',
  'cinnabar',
  'copper',
  'crystal_c_sri_lanka',
  'cuprite',
  'darwin_glass_a',
  'emerald',
  'ferrous_meteorite',
  'fluorite_b',
  'gypsum',
  'heliotrope',
  'indochinite',
  'kunzite',
  'larimar_b',
  'libyan_desert_glass_d',
  'meteorite_1_chelyabinsk',
  'meteorite_pallasite',
  'moldavite_d',
  'moonstone_b',
  'morganite',
  'orpiment',
  'pyrite',
  'rose_quartz',
  'sagenite_a',
  'sagenite_b',
  'silver',
  'sodalite',
  'tourmaline_rubellite',
  'tourmaline_schort',
];

export enum CARD_SET {
  mother = 'mother',
  child = 'child',
  melchisedech = 'melchisedech',
};

export const card_sets = {
  [CARD_SET.mother]: mother,
  [CARD_SET.child]: child,
  [CARD_SET.melchisedech]: melchisedech,
};

export type Card = Mother_card | Child_card | Melchisedech_card;
export type Single_set_cards = Mother_card[] | Child_card[] | Melchisedech_card[];

export interface CardPackage {
  Set: CARD_SET;
  Card: Card;
}
export interface MotherCardPackage extends CardPackage {
  Set: CARD_SET.mother;
  Card: Mother_card;
}
export interface ChildCardPackage extends CardPackage {
  Set: CARD_SET.child;
  Card: Child_card;
}
export interface MelchisedechCardPackage extends CardPackage {
  Set: CARD_SET.melchisedech;
  Card: Melchisedech_card;
}

export function is_mother_card(card: Card): card is Mother_card {
  return (mother as Card[]).includes(card);
}
export function is_child_card(card: Card): card is Child_card {
  return (child as Card[]).includes(card);
}
export function is_melchisedech_card(card: Card): card is Melchisedech_card {
  return (melchisedech as Card[]).includes(card);
}

export type GlobalCard = { id: Card, set: CARD_SET };

export function get_card_key(set: CARD_SET, card_id: Card): string {
  return [set, card_id].join('.');
}
