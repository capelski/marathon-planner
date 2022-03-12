import { TrainingType } from '../models';
import { FullTraining, Intervals } from '../types';

export const getIntervals = (training: FullTraining): Intervals | undefined => {
  return training.type === TrainingType.speed || training.type === TrainingType.strength
    ? training.intervals
    : undefined;
};

export const getIntervalsDistance = (training: FullTraining) => {
  return training.type === TrainingType.speed || training.type === TrainingType.strength
    ? training.intervals.intervalDistance * training.intervals.intervalsNumber +
        training.intervals.recoveryDistance * (training.intervals.intervalsNumber - 1)
    : 0;
};

export const getRegularDistance = (training: FullTraining) => {
  return training.type === TrainingType.moderate ||
    training.type === TrainingType.race ||
    training.type === TrainingType.recovery ||
    training.type === TrainingType.timed
    ? training.distance
    : 0;
};

export const getTrainingDistance = (training: FullTraining) => {
  return (
    getRegularDistance(training) + getIntervalsDistance(training) + getWarmUpDistance(training) * 2
  );
};

export const getWarmUpDistance = (training: FullTraining) => {
  return training.type === TrainingType.speed ||
    training.type === TrainingType.strength ||
    training.type === TrainingType.timed
    ? training.warmUpDistance
    : 0;
};
