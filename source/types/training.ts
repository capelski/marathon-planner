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

export type EasyTraining = {
  type: TrainingType.easy;
} & DistanceTraining;

export type Marathon = {
  type: TrainingType.marathon;
} & DistanceTraining;

export type ModerateTraining = {
  type: TrainingType.moderate;
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
  | EasyTraining
  | Marathon
  | ModerateTraining
  | RecoveryTraining
  | Rest
  | SpeedTraining
  | StrengthTraining
  | TimedTraining;
