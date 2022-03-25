import { DistanceUnits } from '../models';
import { CompletedTrainings } from './completed-trainings';
import { Distance } from './distance';
import { Pace } from './pace';

export type Settings = {
  completedTrainings: CompletedTrainings;
  distanceUnits: DistanceUnits;
  racePace: Pace;
  startDate: Date | undefined;
  warmUpDistance: Distance;
};
