import { Distance } from './distance';
import { DetailedTrainingIntervals } from './training-intervals';
import { Pace } from './pace';
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

type DetailedIntervalsTraining = {
  intervals: DetailedTrainingIntervals;
};

type DetailedTrainingBase = {
  totalDistance: Distance;
};

type PacedTraining = {
  pace: Pace;
};

type WarmedUpTraining = {
  warmUpDistance: Distance; // Warm up / Cool down distance
  warmUpPace: Pace;
};

/* Detailed training types */

export type DetailedModerateTraining = DetailedTrainingBase & ModerateTraining & PacedTraining;

export type DetailedRaceDay = DetailedTrainingBase & RaceDay & PacedTraining;

export type DetailedRecoveryTraining = DetailedTrainingBase & RecoveryTraining & PacedTraining;

export type DetailedRestDay = DetailedTrainingBase & RestDay;

export type DetailedSpeedTraining = DetailedTrainingBase &
  SpeedTraining &
  DetailedIntervalsTraining &
  WarmedUpTraining;

export type DetailedStrengthTraining = DetailedTrainingBase &
  StrengthTraining &
  DetailedIntervalsTraining &
  WarmedUpTraining;

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
