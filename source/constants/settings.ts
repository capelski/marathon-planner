import { DistanceUnits, warmUpDistances } from '../models';
import { Settings } from '../types';
import { defaultRacePace } from './pace';

export const defaultSettings: Settings = {
  distanceUnits: DistanceUnits.kilometers,
  racePace: defaultRacePace,
  skipRecovery: true,
  startDate: undefined,
  warmUpDistance: warmUpDistances[0]
};
