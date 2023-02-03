import { DistanceUnits } from '../models';
import { CompletedTrainings } from './completed-trainings';
import { Distance } from './distance';
import { OptionalDate } from './optional-date';
import { Pace } from './pace';

export type BaseSettings = {
  distanceUnits: DistanceUnits;
  racePace: Pace;
  startDate: OptionalDate;
  warmUpDistance: Distance;
};

export type Settings = BaseSettings & {
  completedTrainings: CompletedTrainings;
};
