import { DistanceUnits } from '../models';
import { Distance } from './distance';
import { Pace } from './pace';

export type Settings = {
  distanceUnits: DistanceUnits;
  racePace: Pace;
  skipRecovery: boolean;
  startDate?: Date;
  warmUpDistance: Distance;
};
