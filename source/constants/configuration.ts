import { DistanceUnits, warmUpDistances } from '../models';
import { Configuration } from '../types';
import { defaultRacePace } from './pace';

export const defaultConfiguration: Configuration = {
  collapsedWeeks: {},
  completedTrainings: {},
  settings: {
    distanceUnits: DistanceUnits.kilometers,
    racePace: defaultRacePace,
    skipRecovery: true,
    startDate: undefined,
    warmUpDistance: warmUpDistances[0]
  },
  skippedWeeks: {}
};
