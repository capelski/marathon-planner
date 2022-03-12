import { TrainingType } from '../models';
import { Intervals } from './intervals';

/* Distance training */

export type DistanceTraining = {
  type: TrainingType.moderate | TrainingType.race | TrainingType.recovery;
  distance: number;
};

/* Intervals training */

export type BaseIntervalsTraining = {
  type: TrainingType.speed | TrainingType.strength;
  intervals: Intervals;
};

export type FullIntervalsTraining = BaseIntervalsTraining & WarmUpTraining;

/* Rest day */

export type RestDay = {
  type: TrainingType.rest;
};

/* Timed training */

export type BaseTimedTraining = {
  distance: number;
  type: TrainingType.timed;
};

export type FullTimedTraining = BaseTimedTraining & WarmUpTraining;

/* Warm-up training */

export type WarmUpTraining = {
  warmUpDistance: number; // Warm up / Cool down distance
};

/* All trainings */

export type BaseTraining = DistanceTraining | BaseIntervalsTraining | RestDay | BaseTimedTraining;

export type FullTraining = DistanceTraining | FullIntervalsTraining | RestDay | FullTimedTraining;
