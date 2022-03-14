import { DistanceUnits } from '../models';

export type Pace = {
  distanceUnits: DistanceUnits;
  seconds: number;
};

export type TrainingPaces = {
  moderate: Pace;
  race: Pace;
  recovery: Pace;
  speed: Pace;
  strength: Pace;
};
