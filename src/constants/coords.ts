import * as Places from './places';

interface Coord {
  x: number;
  y: number;
}
interface Carded_coord extends Coord {
  K?: number;
}

export const map_center: Coord = {
  x: 1953,
  y: 2013,
};
export const gates: Record<Places.Gate_name, Coord> = {
  [Places.gate_1]: { x: 1953, y: 1557 },
  [Places.gate_2]: { x: 1755, y: 1590 },
  [Places.gate_3]: { x: 2569, y: 1931 },
  [Places.gate_4]: { x: 1392, y: 2019 },
  [Places.gate_5]: { x: 2349, y: 1667 },
  [Places.gate_6]: { x: 2288, y: 2376 },
  [Places.gate_7]: { x: 1634, y: 2409 },
};

export const crossroads: Record<Places.Standard_crossroad_name, Coord> = {
  [Places.crossroad_1 ]: { x: 2020, y:  964 },
  [Places.crossroad_2 ]: { x: 1184, y: 2592 },
  [Places.crossroad_3 ]: { x:  528, y: 1732 },
  [Places.crossroad_4 ]: { x: 3388, y: 1680 },
  [Places.crossroad_5 ]: { x: 1888, y:  736 },
  [Places.crossroad_6 ]: { x:  916, y:  936 },
  [Places.crossroad_7 ]: { x: 2624, y: 2420 },
  [Places.crossroad_8 ]: { x: 1280, y: 3020 },
  [Places.crossroad_9 ]: { x: 2668, y: 3032 },
  [Places.crossroad_10]: { x:  944, y: 2968 },
  [Places.crossroad_11]: { x: 2632, y:  556 },
  [Places.crossroad_12]: { x: 2992, y: 1444 },
};

export const white_crossroads: Record<Places.White_crossroad_name, Coord> = {
  [Places.white_crossroad_7 ]: { x: 629, y:  1308 },
  [Places.white_crossroad_12]: { x: 1468, y: 1764 },
};

export const teleports: Record<Places.Teleport_name, Coord> = {
  [Places.teleport_1]: { x: 2888, y: 1595 },
  [Places.teleport_2]: { x: 2712, y: 1073 },
  [Places.teleport_3]: { x:  974, y: 2459 },
  [Places.teleport_4]: { x: 3152, y: 1799 },
  [Places.teleport_5]: { x: 1183, y: 2794 },
  [Places.teleport_6]: { x: 3075, y: 1920 },
};

export const spots: Record<Places.Spot_name, Coord> = {
  ...gates, ...crossroads, ...white_crossroads, ...teleports, map_center,
};

const K = 1;
export const roads: Record<Places.Road_name, Carded_coord[]> = {
  [Places.gate_1_to_crossroad_1]: [
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

  [Places.gate_2_to_crossroad_5]: [
    { x: 1749, y: 1419 },
    { x: 1810, y: 1320, K },
    { x: 1958, y: 1276 },
    { x: 2096, y: 1271 },
    { x: 2211, y: 1282 },
    { x: 2349, y: 1315 },
    { x: 2574, y: 1353 },
    { x: 2552, y: 1243 },
    { x: 2448, y: 1150 },
    { x: 2310, y: 1100 },
    { x: 2173, y: 1089 },
    { x: 1946, y: 1078 },
    { x: 1826, y: 1073 },
    { x: 1788, y:  996 },
    { x: 1810, y:  875 },
  ],

  [Places.gate_3_to_crossroad_7]: [
    { x: 2662, y: 1815 },
    { x: 2640, y: 1694 },
    { x: 2706, y: 1623 },
    { x: 2800, y: 1661 },
    { x: 2838, y: 1777 },
    { x: 2838, y: 1887 },
    { x: 2805, y: 2013, K },
    { x: 2767, y: 2151 },
    { x: 2712, y: 2255 },
  ],

  [Places.gate_4_to_crossroad_6]: [
    { x: 1287, y: 1975 },
    { x: 1276, y: 1859 },
    { x: 1342, y: 1749 },
    { x: 1436, y: 1656 },
    { x: 1535, y: 1546, K },
    { x: 1557, y: 1425 },
    { x: 1502, y: 1331 },
    { x: 1375, y: 1337 },
    { x: 1276, y: 1408 },
    { x: 1144, y: 1502 },
    { x:  985, y: 1529 },
    { x:  853, y: 1458 },
    { x:  787, y: 1348 },
    { x:  770, y: 1194, K },
    { x:  825, y: 1078 },
  ],

  [Places.gate_5_to_crossroad_12]: [
    { x: 2475, y: 1595 },
    { x: 2574, y: 1524 },
    { x: 2684, y: 1480 },
    { x: 2811, y: 1480 },
  ],

  [Places.gate_6_to_crossroad_9]: [
    { x: 2299, y: 2569 },
    { x: 2184, y: 2629 },
    { x: 2035, y: 2624 },
    { x: 1870, y: 2613, K },
    { x: 1722, y: 2602 },
    { x: 1601, y: 2684 },
    { x: 1518, y: 2805 },
    { x: 1496, y: 2943 },
    { x: 1617, y: 2965 },
    { x: 1744, y: 2932 },
    { x: 1870, y: 2888 },
    { x: 2008, y: 2838 },
    { x: 2134, y: 2789 },
    { x: 2266, y: 2745 },
    { x: 2404, y: 2717 },
    { x: 2547, y: 2706 },
    { x: 2673, y: 2750 },
    { x: 2750, y: 2871 },
  ],

  [Places.gate_7_to_crossroad_3]: [
    { x: 1573, y: 2547 },
    { x: 1436, y: 2530 },
    { x: 1342, y: 2442 },
    { x: 1265, y: 2316 },
    { x: 1199, y: 2162, K },
    { x: 1089, y: 2063 },
    { x: 1056, y: 1936 },
    { x: 1029, y: 1804 },
    { x:  908, y: 1683 },
    { x:  759, y: 1678 },
   ],

  [Places.gate_7_to_white_crossroad_12]: [
    { x: 1529, y: 2376 },
    { x: 1430, y: 2261 },
    { x: 1364, y: 2134 },
    { x: 1375, y: 1898 },
  ],

  [Places.crossroad_1_to_crossroad_5]: [
    { x: 2019, y: 825 },
  ],

  [Places.crossroad_1_to_crossroad_6]: [
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

  [Places.crossroad_2_to_crossroad_3]: [
    { x: 1001, y: 2640 },
    { x:  869, y: 2662 },
    { x:  748, y: 2651 },
    { x:  655, y: 2574 },
    { x:  578, y: 2431, K },
    { x:  523, y: 2283 },
    { x:  501, y: 2145 },
    { x:  495, y: 1980 },
  ],

  [Places.crossroad_2_to_crossroad_8]: [
    { x: 1320, y: 2712 },
    { x: 1353, y: 2855 },
  ],

  [Places.crossroad_2_to_teleport_3]: [
    { x: 1150, y: 2426 },
    { x: 1122, y: 2343 },
    { x: 1051, y: 2244 },
    { x:  941, y: 2189 },
    { x:  886, y: 2079 },
    { x:  869, y: 1925 },
    { x:  765, y: 1914 },
    { x:  715, y: 2030, K },
    { x:  721, y: 2156 },
    { x:  765, y: 2283 },
    { x:  864, y: 2387 },
  ],

  [Places.crossroad_3_to_crossroad_6]: [
    { x: 418, y: 1590 },
    { x: 396, y: 1469 },
    { x: 429, y: 1309, K: 2 },
    { x: 506, y: 1155 },
    { x: 600, y: 1040 },
    { x: 715, y: 924 },
  ],

  [Places.crossroad_4_to_crossroad_7]: [
    { x: 3438, y: 1865 },
    { x: 3460, y: 1991 },
    { x: 3454, y: 2145 },
    { x: 3432, y: 2310 },
    { x: 3388, y: 2459, K },
    { x: 3311, y: 2596 },
    { x: 3229, y: 2717, K },
    { x: 3113, y: 2833 },
    { x: 3003, y: 2893 },
    { x: 2921, y: 2822 },
    { x: 2866, y: 2717 },
    { x: 2800, y: 2613 },
    { x: 2728, y: 2536 },
  ],

  [Places.crossroad_4_to_crossroad_11]: [
    { x: 3449, y: 1507 },
    { x: 3460, y: 1359 },
    { x: 3432, y: 1210 },
    { x: 3372, y: 1007, K },
    { x: 3284, y: 847 },
    { x: 3179, y: 710 },
    { x: 3047, y: 600 },
    { x: 2915, y: 528 },
    { x: 2789, y: 495 },
  ],

  [Places.crossroad_4_to_teleport_6]: [
    { x: 3234, y: 1634 },
    { x: 3130, y: 1623 },
    { x: 3025, y: 1672 },
    { x: 2970, y: 1793 },
    { x: 2981, y: 1898 },
  ],

  [Places.crossroad_5_to_crossroad_11]: [
    { x: 1711, y:  726 },
    { x: 1584, y:  754 },
    { x: 1458, y:  792 },
    { x: 1342, y:  836 },
    { x: 1221, y:  897 },
    { x: 1117, y:  957 },
    { x: 1023, y: 1034 },
    { x:  913, y: 1128 },
    { x:  880, y: 1243 },
    { x:  924, y: 1370 },
    { x: 1056, y: 1425 },
    { x: 1194, y: 1342 },
    { x: 1309, y: 1249 },
    { x: 1452, y: 1188 },
    { x: 1601, y: 1128 },
    { x: 1650, y:  985, K },
    { x: 1507, y:  902 },
    { x: 1375, y:  941 },
    { x: 1254, y: 1018, K },
    { x: 1139, y: 1139 },
    { x: 1029, y: 1161 },
    { x:  924, y:  820 },
    { x: 1029, y:  737 },
    { x: 1177, y:  638 },
    { x: 1309, y:  583 },
    { x: 1447, y:  528 },
    { x: 1590, y:  495 },
    { x: 1727, y:  473 },
    { x: 1865, y:  457, K },
    { x: 2013, y:  457, K },
    { x: 2151, y:  468 },
    { x: 2283, y:  484 },
    { x: 2426, y:  523 },
  ],

  [Places.crossroad_7_to_teleport_4]: [
    { x: 2470, y: 2530 },
    { x: 2475, y: 2629 },
    { x: 2778, y: 2761 },
    { x: 2932, y: 2640 },
    { x: 3053, y: 2431 },
    { x: 3102, y: 2288 },
    { x: 3108, y: 2145 },
    { x: 3014, y: 2096 },
    { x: 2921, y: 2184 },
    { x: 2860, y: 2310 },
    { x: 2877, y: 2415 },
    { x: 2948, y: 2503 },
    { x: 3058, y: 2558 },
    { x: 3163, y: 2497 },
    { x: 3240, y: 2365 },
    { x: 3267, y: 2255 },
    { x: 3295, y: 2123, K },
    { x: 3284, y: 1986 },
    { x: 3240, y: 1870 },
  ],

  [Places.crossroad_8_to_crossroad_9]: [
    { x: 1436, y: 3124 },
    { x: 1518, y: 3135 },
    { x: 1672, y: 3124 },
    { x: 1854, y: 3091 },
    { x: 2013, y: 3053, K },
    { x: 2173, y: 2992 },
    { x: 2316, y: 2948 },
    { x: 2448, y: 2910 },
    { x: 2580, y: 2915 },
  ],

  [Places.crossroad_8_to_crossroad_10]: [
    { x: 1139, y: 3069 },
    { x: 1040, y: 3069 },
  ],

  [Places.crossroad_9_to_crossroad_10]: [
    { x: 2508, y: 3141 },
    { x: 2382, y: 3179 },
    { x: 2228, y: 3218 },
    { x: 2079, y: 3251 },
    { x: 1931, y: 3278 },
    { x: 1788, y: 3278 },
    { x: 1639, y: 3273 },
    { x: 1496, y: 3256 },
    { x: 1359, y: 3278, K },
    { x: 1227, y: 3306 },
    { x: 1106, y: 3311 },
    { x:  963, y: 3278 },
    { x:  825, y: 3218 },
    { x:  732, y: 3135 },
    { x:  699, y: 3025 },
    { x:  770, y: 2932 },
  ],

  [Places.crossroad_10_to_teleport_5]: [
    { x: 1106, y: 2899 },
  ],

  [Places.crossroad_11_to_crossroad_12]: [
    { x: 2789, y:  677 },
    { x: 2904, y:  754 },
    { x: 3014, y:  858 },
    { x: 3102, y:  974 },
    { x: 3179, y: 1095 },
    { x: 3212, y: 1238 },
    { x: 3179, y: 1381 },
  ],

  [Places.crossroad_12_to_teleport_2]: [
    { x: 3042, y: 1276 },
    { x: 3014, y: 1155 },
    { x: 2954, y: 1051 },
    { x: 2860, y:  919, K },
    { x: 2745, y:  831 },
    { x: 2624, y:  759 },
    { x: 2508, y:  737 },
    { x: 2420, y:  803 },
    { x: 2382, y:  908 },
    { x: 2437, y: 1018 },
    { x: 2525, y: 1089 },
    { x: 2646, y: 1183 },
    { x: 2772, y: 1249 },
    { x: 2877, y: 1216 },
    { x: 2877, y: 1100 },
    { x: 2800, y: 1007 },
    { x: 2706, y:  924 },
    { x: 2602, y:  869 },
    { x: 2508, y:  886, K },
    { x: 2547, y:  990 },
    { x: 2629, y: 1045 },
  ],

  [Places.white_crossroad_7_to_crossroad_8]: [
    { x:  484, y: 1425 },
    { x:  358, y: 1612 },
    { x:  330, y: 1744 },
    { x:  314, y: 1887 },
    { x:  308, y: 2019 },
    { x:  341, y: 2173, K },
    { x:  369, y: 2305 },
    { x:  424, y: 2437 },
    { x:  501, y: 2585 },
    { x:  589, y: 2684 },
    { x:  699, y: 2761 },
    { x:  825, y: 2778 },
    { x:  968, y: 2745 },
    { x: 1089, y: 2800 },
    { x: 1210, y: 2937 },
  ],

  [Places.white_crossroad_7_to_teleport_1]: [
    { x:  677, y: 1128 },
    { x:  726, y: 1012 },
    { x:  831, y:  798 },
    { x:  952, y:  660, K: 2 },
    { x: 1128, y:  545 },
    { x: 1276, y:  468 },
    { x: 1436, y:  418 },
    { x: 1590, y:  380 },
    { x: 1749, y:  358 },
    { x: 1909, y:  347 },
    { x: 2085, y:  347 },
    { x: 2283, y:  369, K: 2 },
    { x: 2459, y:  413 },
    { x: 2596, y:  457 },
    { x: 2800, y:  572 },
    { x: 2910, y:  633 },
    { x: 3036, y:  726 },
    { x: 3152, y:  847 },
    { x: 3256, y: 1001 },
    { x: 3311, y: 1150 },
    { x: 3333, y: 1320 },
    { x: 3267, y: 1469 },
    { x: 3135, y: 1546 },
    { x: 2992, y: 1579 },
  ],

  [Places.white_crossroad_7_to_white_crossroad_12]: [
    { x:  726, y: 1463 },
    { x:  803, y: 1557 },
    { x:  924, y: 1634 },
    { x: 1073, y: 1656 },
    { x: 1216, y: 1584 },
    { x: 1353, y: 1491 },
    { x: 1441, y: 1540 },
  ],

  [Places.white_crossroad_12_to_gate_6]: [
    { x: 1617, y: 1645 },
    { x: 1755, y: 1557 },
    { x: 1958, y: 1535 },
    { x: 2151, y: 1546, K },
    { x: 2310, y: 1595 },
    { x: 2481, y: 1700 },
    { x: 2585, y: 1815 },
    { x: 2624, y: 1964 },
    { x: 2596, y: 2079 },
    { x: 2536, y: 2200 },
    { x: 2437, y: 2316 },
  ],
};

export function get_coord(place_name: Places.Place_name, field_index: number): Carded_coord {
  const rv = field_index === null
    ? spots[place_name]
    : roads[place_name as Places.Road_name][field_index];
  console.log('got coord based on', place_name, field_index, 'returning', rv, spots);
  return rv;
}
