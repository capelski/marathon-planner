import { DistanceUnits } from '../models';
import { Pace } from '../types';

export const defaultPace: Pace = {
  distanceUnits: DistanceUnits.kilometers,
  seconds: 5 * 60 + 30
};
