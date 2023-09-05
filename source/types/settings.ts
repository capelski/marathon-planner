import { DistanceUnits } from '../models';
import { Distance } from './distance';
import { OptionalDate } from './optional-date';
import { Pace } from './pace';

export type Settings = {
  distanceUnits: DistanceUnits;
  racePace: Pace;
  skipRecovery: boolean;
  startDate: OptionalDate;
  warmUpDistance: Distance;
};
