import { milesToKm } from '../constants';
import { DistanceUnits } from '../models';

export const convertDistance = (distance: number, distanceUnits: DistanceUnits) =>
  distanceUnits === DistanceUnits.kilometers
    ? Math.floor(distance * milesToKm * 10) / 10
    : distance;
