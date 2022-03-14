import { TrainingType } from '../models';
import { Distance } from './distance';
import { TrainingIntervals } from './training-intervals';

/* Common detailed training properties */

type DistanceTraining = {
  distance: Distance;
};

type IntervalsTraining = {
  intervals: TrainingIntervals;
};

/* Training types */

export type ModerateTraining = {
  type: TrainingType.moderate;
} & DistanceTraining;

export type RaceDay = {
  type: TrainingType.race;
} & DistanceTraining;

export type RecoveryTraining = {
  type: TrainingType.recovery;
} & DistanceTraining;

export type RestDay = {
  type: TrainingType.rest;
};

export type SpeedTraining = {
  type: TrainingType.speed;
} & IntervalsTraining;

export type StrengthTraining = {
  type: TrainingType.strength;
} & IntervalsTraining;

export type TimedTraining = {
  type: TrainingType.timed;
} & DistanceTraining;

export type Training =
  | ModerateTraining
  | RaceDay
  | RecoveryTraining
  | RestDay
  | SpeedTraining
  | StrengthTraining
  | TimedTraining;
