export const map_center = 'map_center';
export type Map_center_name = typeof map_center;

export const gate_1 = 'gate_1';
export const gate_2 = 'gate_2';
export const gate_3 = 'gate_3';
export const gate_4 = 'gate_4';
export const gate_5 = 'gate_5';
export const gate_6 = 'gate_6';
export const gate_7 = 'gate_7';

export type Gate_name =
  | typeof gate_1
  | typeof gate_2
  | typeof gate_3
  | typeof gate_4
  | typeof gate_5
  | typeof gate_6
  | typeof gate_7;

export const gates: Gate_name[] = [
  gate_1,
  gate_2,
  gate_3,
  gate_4,
  gate_5,
  gate_6,
  gate_7,
];

export const crossroad_1  = 'crossroad_1';
export const crossroad_2  = 'crossroad_2';
export const crossroad_3  = 'crossroad_3';
export const crossroad_4  = 'crossroad_4';
export const crossroad_5  = 'crossroad_5';
export const crossroad_6  = 'crossroad_6';
export const crossroad_7  = 'crossroad_7';
export const crossroad_8  = 'crossroad_8';
export const crossroad_9  = 'crossroad_9';
export const crossroad_10 = 'crossroad_10';
export const crossroad_11 = 'crossroad_11';
export const crossroad_12 = 'crossroad_12';

export type Standard_crossroad_name =
  | typeof crossroad_1
  | typeof crossroad_2
  | typeof crossroad_3
  | typeof crossroad_4
  | typeof crossroad_5
  | typeof crossroad_6
  | typeof crossroad_7
  | typeof crossroad_8
  | typeof crossroad_9
  | typeof crossroad_10
  | typeof crossroad_11
  | typeof crossroad_12;

export const crossroads: Standard_crossroad_name[] = [
  crossroad_1,
  crossroad_2,
  crossroad_3,
  crossroad_4,
  crossroad_5,
  crossroad_6,
  crossroad_7,
  crossroad_8,
  crossroad_9,
  crossroad_10,
  crossroad_11,
  crossroad_12,
];

export const teleport_1 = 'teleport_1';
export const teleport_2 = 'teleport_2';
export const teleport_3 = 'teleport_3';
export const teleport_4 = 'teleport_4';
export const teleport_5 = 'teleport_5';
export const teleport_6 = 'teleport_6';

export type Teleport_name =
  | typeof teleport_1
  | typeof teleport_2
  | typeof teleport_3
  | typeof teleport_4
  | typeof teleport_5
  | typeof teleport_6;

export const teleports: Teleport_name[] = [
  teleport_1,
  teleport_2,
  teleport_3,
  teleport_4,
  teleport_5,
  teleport_6,
];

export const white_crossroad_7 = 'white_crossroad_7';
export const white_crossroad_12 = 'white_crossroad_12';

export type White_crossroad_name =
  | typeof white_crossroad_7
  | typeof white_crossroad_12;

export const white_crossroads: (White_crossroad_name | null)[] = [
  null, null, null, null, null, null,
  white_crossroad_7,
  null, null, null, null,
  white_crossroad_12,
];

export const actual_white_crossroads: White_crossroad_name[] = [
  white_crossroad_7, white_crossroad_12,
]

export type Crossroad_name = Standard_crossroad_name | White_crossroad_name;

export const spots: Spot_name[] = ([] as Spot_name[]).concat(
  (gates                   as Spot_name[]),
  (crossroads              as Spot_name[]),
  (teleports               as Spot_name[]),
  (actual_white_crossroads as Spot_name[])
);

export type Spot_name =
  | Map_center_name
  | Gate_name
  | Crossroad_name
  | Teleport_name
  | White_crossroad_name;

export const gate_1_to_crossroad_1 = 'gate_1_to_crossroad_1';
export const gate_2_to_crossroad_5 = 'gate_2_to_crossroad_5';
export const gate_3_to_crossroad_7 = 'gate_3_to_crossroad_7';
export const gate_4_to_crossroad_6 = 'gate_4_to_crossroad_6';
export const gate_5_to_crossroad_12 = 'gate_5_to_crossroad_12';
export const gate_6_to_crossroad_9 = 'gate_6_to_crossroad_9';
export const gate_7_to_crossroad_3 = 'gate_7_to_crossroad_3';
export const gate_7_to_white_crossroad_12 = 'gate_7_to_white_crossroad_12';
export const crossroad_1_to_crossroad_5 = 'crossroad_1_to_crossroad_5';
export const crossroad_1_to_crossroad_6 = 'crossroad_1_to_crossroad_6';
export const crossroad_2_to_crossroad_3 = 'crossroad_2_to_crossroad_3';
export const crossroad_2_to_crossroad_8 = 'crossroad_2_to_crossroad_8';
export const crossroad_2_to_teleport_3 = 'crossroad_2_to_teleport_3';
export const crossroad_3_to_crossroad_6 = 'crossroad_3_to_crossroad_6';
export const crossroad_4_to_crossroad_7 = 'crossroad_4_to_crossroad_7';
export const crossroad_4_to_crossroad_11 = 'crossroad_4_to_crossroad_11';
export const crossroad_4_to_teleport_6 = 'crossroad_4_to_teleport_6';
export const crossroad_5_to_crossroad_11 = 'crossroad_5_to_crossroad_11';
export const crossroad_7_to_teleport_4 = 'crossroad_7_to_teleport_4';
export const crossroad_8_to_crossroad_9 = 'crossroad_8_to_crossroad_9';
export const crossroad_8_to_crossroad_10 = 'crossroad_8_to_crossroad_10';
export const crossroad_9_to_crossroad_10 = 'crossroad_9_to_crossroad_10';
export const crossroad_10_to_teleport_5 = 'crossroad_10_to_teleport_5';
export const crossroad_11_to_crossroad_12 = 'crossroad_11_to_crossroad_12';
export const crossroad_12_to_teleport_2 = 'crossroad_12_to_teleport_2';
export const white_crossroad_7_to_crossroad_8 = 'white_crossroad_7_to_crossroad_8';
export const white_crossroad_7_to_teleport_1 = 'white_crossroad_7_to_teleport_1';
export const white_crossroad_7_to_white_crossroad_12 = 'white_crossroad_7_to_white_crossroad_12';
export const white_crossroad_12_to_gate_6 = 'white_crossroad_12_to_gate_6';

export type Road_name =
  | typeof gate_1_to_crossroad_1
  | typeof gate_2_to_crossroad_5
  | typeof gate_3_to_crossroad_7
  | typeof gate_4_to_crossroad_6
  | typeof gate_5_to_crossroad_12
  | typeof gate_6_to_crossroad_9
  | typeof gate_7_to_crossroad_3
  | typeof gate_7_to_white_crossroad_12
  | typeof crossroad_1_to_crossroad_5
  | typeof crossroad_1_to_crossroad_6
  | typeof crossroad_2_to_crossroad_3
  | typeof crossroad_2_to_crossroad_8
  | typeof crossroad_2_to_teleport_3
  | typeof crossroad_3_to_crossroad_6
  | typeof crossroad_4_to_crossroad_7
  | typeof crossroad_4_to_crossroad_11
  | typeof crossroad_4_to_teleport_6
  | typeof crossroad_5_to_crossroad_11
  | typeof crossroad_7_to_teleport_4
  | typeof crossroad_8_to_crossroad_9
  | typeof crossroad_8_to_crossroad_10
  | typeof crossroad_9_to_crossroad_10
  | typeof crossroad_10_to_teleport_5
  | typeof crossroad_11_to_crossroad_12
  | typeof crossroad_12_to_teleport_2
  | typeof white_crossroad_7_to_crossroad_8
  | typeof white_crossroad_7_to_teleport_1
  | typeof white_crossroad_7_to_white_crossroad_12
  | typeof white_crossroad_12_to_gate_6;

export const roads: Road_name[] = [
  gate_1_to_crossroad_1,
  gate_2_to_crossroad_5,
  gate_3_to_crossroad_7,
  gate_4_to_crossroad_6,
  gate_5_to_crossroad_12,
  gate_6_to_crossroad_9,
  gate_7_to_crossroad_3,
  gate_7_to_white_crossroad_12,
  crossroad_1_to_crossroad_5,
  crossroad_1_to_crossroad_6,
  crossroad_2_to_crossroad_3,
  crossroad_2_to_crossroad_8,
  crossroad_2_to_teleport_3,
  crossroad_3_to_crossroad_6,
  crossroad_4_to_crossroad_7,
  crossroad_4_to_crossroad_11,
  crossroad_4_to_teleport_6,
  crossroad_5_to_crossroad_11,
  crossroad_7_to_teleport_4,
  crossroad_8_to_crossroad_9,
  crossroad_8_to_crossroad_10,
  crossroad_9_to_crossroad_10,
  crossroad_10_to_teleport_5,
  crossroad_11_to_crossroad_12,
  crossroad_12_to_teleport_2,
  white_crossroad_7_to_crossroad_8,
  white_crossroad_7_to_teleport_1,
  white_crossroad_7_to_white_crossroad_12,
  white_crossroad_12_to_gate_6,
];

export type Place_name = Spot_name | Road_name;

export const paths: Partial<{[start in Spot_name]: Partial<{[end in Spot_name]: Road_name}>}> = {
  [gate_1]: { [crossroad_1]: gate_1_to_crossroad_1 },
  [gate_2]: { [crossroad_5]: gate_2_to_crossroad_5 },
  [gate_3]: { [crossroad_7]: gate_3_to_crossroad_7 },
  [gate_4]: { [crossroad_6]: gate_4_to_crossroad_6 },
  [gate_5]: { [crossroad_12]: gate_5_to_crossroad_12 },
  [gate_6]: { [crossroad_9]: gate_6_to_crossroad_9 },
  [gate_7]: {
    [crossroad_3]: gate_7_to_crossroad_3,
    [white_crossroad_12]: gate_7_to_white_crossroad_12,
  },
  [crossroad_1]: {
    [crossroad_5]: crossroad_1_to_crossroad_5,
    [crossroad_6]: crossroad_1_to_crossroad_6,
  },
  [crossroad_2]: {
    [crossroad_3]: crossroad_2_to_crossroad_3,
    [crossroad_8]: crossroad_2_to_crossroad_8,
    [teleport_3]: crossroad_2_to_teleport_3,
  },
  [crossroad_3]: { [crossroad_6]: crossroad_3_to_crossroad_6 },
  [crossroad_4]: {
    [crossroad_7]: crossroad_4_to_crossroad_7,
    [crossroad_11]: crossroad_4_to_crossroad_11,
    [teleport_6]: crossroad_4_to_teleport_6,
  },
  [crossroad_5]: { [crossroad_11]: crossroad_5_to_crossroad_11 },
  [crossroad_7]: { [teleport_4]: crossroad_7_to_teleport_4 },
  [crossroad_8]: {
    [crossroad_9]: crossroad_8_to_crossroad_9,
    [crossroad_10]: crossroad_8_to_crossroad_10,
  },
  [crossroad_9]: { [crossroad_10]: crossroad_9_to_crossroad_10 },
  [crossroad_10]: { [teleport_5]: crossroad_10_to_teleport_5 },
  [crossroad_11]: { [crossroad_12]: crossroad_11_to_crossroad_12 },
  [crossroad_12]: { [teleport_2]: crossroad_12_to_teleport_2 },
  [white_crossroad_7]: {
    [crossroad_8]: white_crossroad_7_to_crossroad_8,
    [teleport_1]: white_crossroad_7_to_teleport_1,
    [white_crossroad_12]: white_crossroad_7_to_white_crossroad_12,
  },
  [white_crossroad_12]: { [gate_6]: white_crossroad_12_to_gate_6 },
};
