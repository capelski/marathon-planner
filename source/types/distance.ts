import { DistanceUnits } from '../models';
import { Pace } from './pace';

export type Distance = {
  distanceUnits: DistanceUnits;
  value: number;
};

export type PacedDistance = Distance & {
  pace: Pace;
};
