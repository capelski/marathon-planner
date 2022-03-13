import { DistanceUnits } from '../models';

export const convertDistance = (distance: number, distanceUnits: DistanceUnits) =>
  distanceUnits === DistanceUnits.kilometers ? Math.floor(distance * 16.09) / 10 : distance;
