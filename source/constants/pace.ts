import { DistanceUnits } from '../models';
import { Pace } from '../types';

export const defaultRacePace: Pace = {
  distanceUnits: DistanceUnits.kilometers,
  seconds: 5 * 60 + 15 // 5' 15"
};

export const moderatePaceVariation: Pace = {
  distanceUnits: DistanceUnits.miles,
  seconds: 60
};

export const recoveryPaceVariation: Pace = {
  distanceUnits: DistanceUnits.miles,
  seconds: 120
};

export const strengthPaceVariation: Pace = {
  distanceUnits: DistanceUnits.miles,
  seconds: -10
};

export const speedPaceVariation: Pace = {
  distanceUnits: DistanceUnits.miles,
  seconds: -20
};
