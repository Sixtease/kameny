import * as Places from '../constants/places';
import { Carded_coord, roads, spots } from '../constants/coords';
import { Grammatical_case } from '../constants/lingua';

export function is_road(place: Places.Place_name): place is Places.Road_name {
  return (Places.roads as Places.Place_name[]).includes(place);
}
export function is_teleport(place: Places.Place_name): place is Places.Teleport_name {
  return (Places.teleports as Places.Place_name[]).includes(place);
}
export function is_crossroad(place: Places.Place_name): place is Places.Crossroad_name {
  return (Places.crossroads as Places.Place_name[]).concat(
    Places.actual_white_crossroads as Places.Place_name[]
  ).includes(place);
}
export function is_white_crossroad(place: Places.Place_name): boolean {
  return (Places.actual_white_crossroads as Places.Place_name[]).includes(place);
}
export function is_gate(place: Places.Place_name): place is Places.Gate_name {
  return (Places.gates as Places.Place_name[]).includes(place);
}

export enum DIRECTION {
  FORWARD = 'FORWARD',
  BACKWARD = 'BACKWARD',
}
const _road_connects: Partial<{
  [road in Places.Road_name]: Partial<{
    [start in Places.Spot_name]: { destination: Places.Spot_name; direction: DIRECTION }
  }>
}> = {};
const adjacent_roads: Partial<{ [spot in Places.Spot_name]: [ { road: Places.Road_name, direction: DIRECTION } ] }> = {};
for (let start in Places.paths) {
  const end_to_road: Partial<{[end in Places.Spot_name]: Places.Road_name}> = Places.paths[start];
  for (let end in end_to_road) {
    const road: Places.Road_name = end_to_road[end];
    if (!_road_connects[road]) {
      _road_connects[road] = {};
    }
    _road_connects[road]![start] = { destination: end, direction: DIRECTION.FORWARD };
    _road_connects[road]![end] = { destination: start, direction: DIRECTION.BACKWARD };

    if (!adjacent_roads[start]) {
      adjacent_roads[start] = [];
    }
    adjacent_roads[start].push({ road, direction: DIRECTION.FORWARD });
    if (!adjacent_roads[end]) {
      adjacent_roads[end] = [];
    }
    adjacent_roads[end].push({ road, direction: DIRECTION.BACKWARD });
  }
}
export function road_connects(road: Places.Road_name, start: Places.Spot_name): { destination: Places.Spot_name; direction: DIRECTION } {
  if (!_road_connects[road]) {
    throw new Error(`${road} not in road_connects`);
  }
  if (!_road_connects[road]![start]) {
    throw new Error(`${start} not connected by road ${road}`);
  }
  return _road_connects[road]![start]!;
}
export function get_adjacent_roads(spot: Places.Spot_name): [ { road: Places.Road_name, direction: DIRECTION } ] {
  if (!adjacent_roads[spot]) {
    throw new Error(`${spot} not in adjacent_roads`);
  }
  return adjacent_roads[spot]!;
}

export function get_road_length(name: Places.Road_name): number {
  return roads[name].length;
}

export function is_spot(n: Places.Place_name): n is Places.Spot_name {
  return (Places.spots as Places.Place_name[]).includes(n);
}

export function get_coord(place_name: Places.Place_name, field_index: number): Carded_coord {
  const rv = is_road(place_name)
    ? roads[place_name as Places.Road_name][field_index]
    : spots[place_name];
  return rv;
}

function get_place_number(place: string): string {
  return place.match(/\d+/)![0];
}

function common_crossroad_language_expression(crossroad: Places.Crossroad_name, grammatical_case: Grammatical_case): string {
  const crossroad_number = get_place_number(crossroad);
  switch (grammatical_case) {
    case Grammatical_case.nominative:
      return `křižovatka číslo ${crossroad_number}`;
    case Grammatical_case.genitive:
      return `křižovatky číslo ${crossroad_number}`;
    case Grammatical_case.dative:
    case Grammatical_case.locative:
      return `křižovatce číslo ${crossroad_number}`;
    case Grammatical_case.accusative:
      return `křižovatku číslo ${crossroad_number}`;
    case Grammatical_case.instrumental:
      return `křižovatkou číslo ${crossroad_number}`;
    default:
      return `křiž. číslo ${crossroad_number}`;
  }
}

function crossroad_language_expression(crossroad: Places.Crossroad_name, grammatical_case: Grammatical_case): string {
  const is_white = is_white_crossroad(crossroad);
  const common_lang = common_crossroad_language_expression(crossroad, grammatical_case);
  return is_white ? `${common_lang} na dráze milosti` : common_lang;
}

function teleport_language_expression(teleport: Places.Teleport_name, grammatical_case: Grammatical_case): string {
  const teleport_number = get_place_number(teleport);
  switch (grammatical_case) {
    case Grammatical_case.genitive:
    case Grammatical_case.dative:
    case Grammatical_case.locative:
      return `teleportu číslo ${teleport_number}`;
    case Grammatical_case.instrumental:
      return `teleportem číslo ${teleport_number}`;
    case Grammatical_case.nominative:
    case Grammatical_case.accusative:
    default:
      return `teleport číslo ${teleport_number}`;
  }
}

function place_language_expression_by_place_type(place: Places.Place_name, grammatical_case: Grammatical_case): string {
  if (is_crossroad(place)) {
    return crossroad_language_expression(place, grammatical_case);
  }
  if (is_teleport(place)) {
    return teleport_language_expression(place, grammatical_case);
  }
  return place;
}

export function place_language_expression(place: Places.Place_name): ((grammatical_case: Grammatical_case) => string) {
  return (gc: Grammatical_case) => place_language_expression_by_place_type(place, gc);
}
