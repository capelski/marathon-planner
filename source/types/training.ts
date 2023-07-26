import { TrainingType } from '../models';
import { Distance } from './distance';

/* Common detailed training properties */

type DistanceTraining = {
  distance: Distance;
};

type IntervalsTraining = {
  intervalDistance: Distance;
  intervalsNumber: number;
  recoveryDistance: Distance;
};

/* Training types */

export type LongRun = {
  type: TrainingType.longRun;
} & DistanceTraining;

export type ModerateTraining = {
  type: TrainingType.moderate;
} & DistanceTraining;

export type Race = {
  type: TrainingType.race;
} & DistanceTraining;

export type RecoveryTraining = {
  type: TrainingType.recovery;
} & DistanceTraining;

export type Rest = {
  type: TrainingType.rest;
};

export type SpeedTraining = {
  type: TrainingType.speed;
  intervals: IntervalsTraining;
};

export type StrengthTraining = {
  type: TrainingType.strength;
  intervals: IntervalsTraining;
};

export type TimedTraining = {
  type: TrainingType.timed;
} & DistanceTraining;

export type Training =
  | LongRun
  | ModerateTraining
  | Race
  | RecoveryTraining
  | Rest
  | SpeedTraining
  | StrengthTraining
  | TimedTraining;
