export const map_center = {
  x: 1953,
  y: 2013,
};
export const entrances = [
  { x: 1953, y: 1557 },
  { x: 1755, y: 1590 },
  { x: 2569, y: 1931 },
  { x: 1392, y: 2019 },
  { x: 2349, y: 1667 },
  { x: 2288, y: 2376 },
  { x: 1634, y: 2409 },
];

export const crossroads = [
  { x: 2020, y:  964 },
  { x: 1184, y: 2592 },
  { x:  528, y: 1732 },
  { x: 3388, y: 1680 },
  { x: 1888, y:  736 },
  { x:  916, y:  936 },
  { x: 2624, y: 2420 },
  { x: 1280, y: 3020 },
  { x: 2668, y: 3032 },
  { x:  944, y: 2968 },
  { x: 2632, y:  556 },
  { x: 2992, y: 1444 },
];

export const white_crossroads = [
  null, null, null, null, null, null,
  { x: 629, y:  1308 },
  null, null, null, null,
  { x: 1468, y: 1764 },
];

const K = 'K';
export const fields = {
  //od brány 1 ke křižovatce 1
  gate_1_to_crossroad_1: [
    { x: 1968, y: 1420 },
    { x: 2072, y: 1380, K },
    { x: 2200, y: 1388 },
    { x: 2328, y: 1400, K },
    { x: 2448, y: 1396 },
    { x: 2476, y: 1308 },
    { x: 2396, y: 1216 },
    { x: 2248, y: 1188 },
    { x: 2080, y: 1176, K },
    { x: 1948, y: 1140 },
    { x: 1904, y: 1080 },
  ],

  // od křižovatky 1 ke křižovatce 6
  crossroad_1_to_crossroad_6: [
    { x: 2200, y: 920 },
    { x: 2280, y: 796 },
    { x: 2232, y: 680 },
    { x: 2124, y: 616, K },
    { x: 1976, y: 600 },
    { x: 1852, y: 600 },
    { x: 1696, y: 616 },
    { x: 1580, y: 644 },
    { x: 1420, y: 696 },
    { x: 1272, y: 748 },
    { x: 1128, y: 828 },
  ],

  crossroad_6_to_crossroad_3: [
    { x: 720, y: 928 },
  ],
};
