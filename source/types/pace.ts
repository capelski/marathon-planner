import { DistanceUnits, TrainingType } from '../models';
import { Dictionary } from './dictionary';

export type Pace = {
  distanceUnits: DistanceUnits;
  seconds: number;
};

export type TrainingPaces = Dictionary<Pace, TrainingType>;
