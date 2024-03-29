import { DistanceUnits } from '../models';
import { Pace } from '../types';

export const speedPaceVariation: Pace = {
  distanceUnits: DistanceUnits.miles,
  seconds: -40
};

export const strengthPaceVariation: Pace = {
  distanceUnits: DistanceUnits.miles,
  seconds: -10
};

export const defaultRacePace: Pace = {
  distanceUnits: DistanceUnits.kilometers,
  seconds: 5 * 60 + 30 // 5' 30"
};

export const moderatePaceVariation: Pace = {
  distanceUnits: DistanceUnits.miles,
  seconds: 40
};

export const easyPaceVariation: Pace = {
  distanceUnits: DistanceUnits.miles,
  seconds: 60
};

export const recoveryPaceVariation: Pace = {
  distanceUnits: DistanceUnits.miles,
  seconds: 120
};
