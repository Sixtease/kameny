export const gate_1 = 'gate_1';
export const gate_2 = 'gate_2';
export const gate_3 = 'gate_3';
export const gate_4 = 'gate_4';
export const gate_5 = 'gate_5';
export const gate_6 = 'gate_6';
export const gate_7 = 'gate_7';

export const gates = [
  gate_1,
  gate_2,
  gate_3,
  gate_4,
  gate_5,
  gate_6,
  gate_7,
];

export const crossroard_1  = 'crossroad_1';
export const crossroard_2  = 'crossroad_2';
export const crossroard_3  = 'crossroad_3';
export const crossroard_4  = 'crossroad_4';
export const crossroard_5  = 'crossroad_5';
export const crossroard_6  = 'crossroad_6';
export const crossroard_7  = 'crossroad_7';
export const crossroard_8  = 'crossroad_8';
export const crossroard_9  = 'crossroad_9';
export const crossroard_10 = 'crossroad_10';
export const crossroard_11 = 'crossroad_11';
export const crossroard_12 = 'crossroad_12';

export const crossroads = [
  crossroard_1,
  crossroard_2,
  crossroard_3,
  crossroard_4,
  crossroard_5,
  crossroard_6,
  crossroard_7,
  crossroard_8,
  crossroard_9,
  crossroard_10,
  crossroard_11,
  crossroard_12,
];

export const teleport_1 = 'teleport_1';
export const teleport_2 = 'teleport_2';
export const teleport_3 = 'teleport_3';
export const teleport_4 = 'teleport_4';
export const teleport_5 = 'teleport_5';
export const teleport_6 = 'teleport_6';

export const teleports = [
  teleport_1,
  teleport_2,
  teleport_3,
  teleport_4,
  teleport_5,
  teleport_6,
];

export const white_crossroad_7 = 'white_crossroad_7';
export const white_crossroad_12 = 'white_crossroad_12';

export const white_crossroads = [
  null, null, null, null, null, null,
  white_crossroad_7,
  null, null, null, null,
  white_crossroad_12,
];

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
export const crossroad_10_to_teleport_8 = 'crossroad_10_to_teleport_8';
export const crossroad_11_to_crossroad_12 = 'crossroad_11_to_crossroad_12';
export const crossroad_12_to_teleport_2 = 'crossroad_12_to_teleport_2';
export const white_crossroad_7_to_crossroad_8 = 'white_crossroad_7_to_crossroad_8';
export const white_crossroad_7_to_teleport_1 = 'white_crossroad_7_to_teleport_1';
export const white_crossroad_7_to_white_crossroad_12 = 'white_crossroad_7_to_white_crossroad_12';
export const white_crossroad_12_to_gate_6 = 'white_crossroad_12_to_gate_6';

export const paths = {
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
  [crossroad_10]: { [teleport_8]: crossroad_10_to_teleport_8 },
  [crossroad_11]: { [crossroad_12]: crossroad_11_to_crossroad_12 },
  [crossroad_12]: { [teleport_2]: crossroad_12_to_teleport_2 },
  [white_crossroad_7]: {
    [crossroad_8]: white_crossroad_7_to_crossroad_8,
    [teleport_1]: white_crossroad_7_to_teleport_1,
    [white_crossroad_12]: white_crossroad_7_to_white_crossroad_12,
  },
  [white_crossroad_12]: { [gate_6]: white_crossroad_12_to_gate_6 },
};
