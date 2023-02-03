import { DistanceUnits, warmUpDistances } from '../models';
import { BaseSettings } from '../types';
import { defaultRacePace } from './pace';

export const defaultBaseSettings: BaseSettings = {
  distanceUnits: DistanceUnits.kilometers,
  racePace: defaultRacePace,
  skipRecovery: true,
  startDate: undefined,
  warmUpDistance: warmUpDistances[0]
};