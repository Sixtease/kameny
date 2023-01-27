import * as Places from '../constants/places';
import { get_adjacent_roads, is_road, is_spot, is_teleport, road_connects } from './place_info';

export function transitions(current_place: Places.Place_name, previous_place: Places.Place_name): Places.Place_name[] {
  if (is_road(current_place)) {
    if (!is_spot(previous_place)) {
      throw new Error(`came to road from non-spot ${previous_place}`);
    }
    return [road_connects(current_place, previous_place).destination];
  }
  if (is_teleport(current_place) && is_road(previous_place)) {
    return Places.teleports;
  }
  if (current_place === Places.map_center) {
    return Places.gates.filter(g => g !== Places.gate_7);
  }
  if (is_spot(current_place)) {
    const adjacent_roads = get_adjacent_roads(current_place).map(x => x.road);
    let possible_next_roads = adjacent_roads.filter(r => r !== previous_place);
    if (current_place === Places.gate_6) {
      // white_crossroad_12_to_gate_6 is one-way
      possible_next_roads = possible_next_roads.filter(r => r !== Places.white_crossroad_12_to_gate_6);
    }
    return possible_next_roads;
    // return adjacent_roads.length > 1 ? adjacent_roads : possible_next_roads; // DEBUG: Allow turn-around
  }
  console.warn(`unexpected place ${current_place}`);
  return [];
}
