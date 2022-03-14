import { Distance, PacedDistance } from './distance';
import { DetailedTrainingIntervals } from './training-intervals';
import {
  ModerateTraining,
  RaceDay,
  RecoveryTraining,
  RestDay,
  SpeedTraining,
  StrengthTraining,
  TimedTraining
} from './training';

/* Common detailed training properties */

export type DetailedIntervalsTraining = WarmedUpTraining & {
  intervals: DetailedTrainingIntervals;
};

type DetailedTrainingBase = {
  totalDistance: Distance;
};

type PacedTraining = {
  distance: PacedDistance;
};

export type WarmedUpTraining = {
  warmUpDistance: PacedDistance; // Warm up / Cool down distance
};

/* Detailed training types */

export type DetailedModerateTraining = DetailedTrainingBase & ModerateTraining & PacedTraining;

export type DetailedRaceDay = DetailedTrainingBase & RaceDay & PacedTraining;

export type DetailedRecoveryTraining = DetailedTrainingBase & RecoveryTraining & PacedTraining;

export type DetailedRestDay = DetailedTrainingBase & RestDay;

export type DetailedSpeedTraining = DetailedTrainingBase &
  SpeedTraining &
  DetailedIntervalsTraining;

export type DetailedStrengthTraining = DetailedTrainingBase &
  StrengthTraining &
  DetailedIntervalsTraining;

export type DetailedTimedTraining = DetailedTrainingBase &
  TimedTraining &
  PacedTraining &
  WarmedUpTraining;

export type DetailedTraining =
  | DetailedModerateTraining
  | DetailedRaceDay
  | DetailedRestDay
  | DetailedRecoveryTraining
  | DetailedRestDay
  | DetailedSpeedTraining
  | DetailedStrengthTraining
  | DetailedTimedTraining;
