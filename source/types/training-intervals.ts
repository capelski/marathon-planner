import { Distance } from './distance';
import { Pace } from './pace';

export type TrainingIntervals = {
  intervalDistance: Distance;
  intervalsNumber: number;
  recoveryDistance: Distance;
};

export type DetailedTrainingIntervals = TrainingIntervals & {
  intervalPace: Pace;
  recoveryPace: Pace;
};
