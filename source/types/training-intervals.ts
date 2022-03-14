import { Distance, PacedDistance } from './distance';

export type TrainingIntervals = {
  intervalDistance: Distance;
  intervalsNumber: number;
  recoveryDistance: Distance;
};

export type DetailedTrainingIntervals = TrainingIntervals & {
  intervalDistance: PacedDistance;
  recoveryDistance: PacedDistance;
};
