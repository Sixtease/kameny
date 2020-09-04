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
    return Places.gates;
  }
  if (is_spot(current_place)) {
    const adjacent_roads = get_adjacent_roads(current_place).map(x => x.road);
    const possible_next_roads = adjacent_roads.filter(r => r !== previous_place);
    return possible_next_roads;
  }
  console.warn(`unexpected place ${current_place}`);
  return [];
}
