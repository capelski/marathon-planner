import { TrainingCategory } from '../models';
import { Distance, PacedDistance } from './distance';
import {
  LongRun,
  ModerateTraining,
  RaceDay,
  RecoveryTraining,
  RestDay,
  SpeedTraining,
  StrengthTraining,
  TimedTraining
} from './training';
import { DetailedTrainingIntervals } from './training-intervals';

/* Common detailed training properties */

export type DetailedDistanceTraining = DetailedTrainingBase & {
  category: TrainingCategory.distance;
  distance: PacedDistance;
};

export type DetailedIntervalsTraining = DetailedTrainingBase & {
  category: TrainingCategory.intervals;
  warmUpDistance: PacedDistance; // Warm up / Cool down distance
  intervals: DetailedTrainingIntervals;
};

type DetailedTrainingBase = {
  totalDistance: Distance;
  totalSeconds: number;
};

export type DetailedWarmedUpTraining = DetailedTrainingBase & {
  category: TrainingCategory.warmedUp;
  distance: PacedDistance;
  warmUpDistance: PacedDistance; // Warm up / Cool down distance
};

/* Detailed training types */

export type DetailedLongRun = DetailedDistanceTraining & {
  type: LongRun['type'];
};

export type DetailedModerateTraining = DetailedDistanceTraining & {
  type: ModerateTraining['type'];
};

export type DetailedRaceDay = DetailedDistanceTraining & {
  type: RaceDay['type'];
};

export type DetailedRecoveryTraining = DetailedDistanceTraining & {
  type: RecoveryTraining['type'];
};

export type DetailedRestDay = DetailedTrainingBase & {
  category: TrainingCategory.none;
  type: RestDay['type'];
};

export type DetailedSpeedTraining = DetailedIntervalsTraining & {
  type: SpeedTraining['type'];
};

export type DetailedStrengthTraining = DetailedIntervalsTraining & {
  type: StrengthTraining['type'];
};

export type DetailedTimedTraining = DetailedWarmedUpTraining & {
  type: TimedTraining['type'];
};

export type DetailedTraining =
  | DetailedLongRun
  | DetailedModerateTraining
  | DetailedRaceDay
  | DetailedRestDay
  | DetailedRecoveryTraining
  | DetailedRestDay
  | DetailedSpeedTraining
  | DetailedStrengthTraining
  | DetailedTimedTraining;
