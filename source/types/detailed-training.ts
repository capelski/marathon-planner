import { TrainingCategory } from '../models';
import { PacedDistance } from './paced-distance';
import {
  EasyTraining,
  Marathon,
  ModerateTraining,
  RecoveryTraining,
  Rest,
  Simulator,
  SpeedTraining,
  StrengthTraining,
  TimedTraining
} from './training';

/* Common detailed training properties */

export type DetailedDistanceTraining = DetailedTrainingBase & {
  category: TrainingCategory.distance;
};

export type DetailedIntervalsTraining = DetailedTrainingBase & {
  category: TrainingCategory.intervals;
  warmUpDistance: PacedDistance; // Warm up / Cool down distance
  intervals: {
    intervalDistance: PacedDistance;
    intervalsNumber: number;
    recoveryDistance: PacedDistance;
  };
};

type DetailedTrainingBase = {
  number: number;
  isCompleted: boolean;
  totalDistance: PacedDistance;
};

export type DetailedWarmedUpTraining = DetailedTrainingBase & {
  category: TrainingCategory.warmedUp;
  distance: PacedDistance;
  warmUpDistance: PacedDistance; // Warm up / Cool down distance
};

/* Detailed training types */

export type DetailedEasyTraining = DetailedDistanceTraining & {
  type: EasyTraining['type'];
};

export type DetailedMarathon = DetailedDistanceTraining & {
  type: Marathon['type'];
};

export type DetailedModerateTraining = DetailedDistanceTraining & {
  type: ModerateTraining['type'];
};

export type DetailedRecoveryTraining = DetailedDistanceTraining & {
  type: RecoveryTraining['type'];
};

export type DetailedRest = DetailedTrainingBase & {
  category: TrainingCategory.none;
  type: Rest['type'];
};

export type DetailedSimulatorTraining = DetailedWarmedUpTraining & {
  type: Simulator['type'];
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
  | DetailedEasyTraining
  | DetailedMarathon
  | DetailedModerateTraining
  | DetailedRecoveryTraining
  | DetailedRest
  | DetailedSimulatorTraining
  | DetailedSpeedTraining
  | DetailedStrengthTraining
  | DetailedTimedTraining;
