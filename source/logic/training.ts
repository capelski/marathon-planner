import { TrainingType } from '../models';
import { FullTraining } from '../types';

export const getCoreDistance = (training: FullTraining) => {
  return training.type === TrainingType.moderate ||
    training.type === TrainingType.race ||
    training.type === TrainingType.recovery ||
    training.type === TrainingType.timed
    ? training.distance
    : training.type === TrainingType.speed || training.type === TrainingType.strength
    ? training.intervalDistance * training.intervalsNumber +
      training.intervalRecovery * (training.intervalsNumber - 1)
    : 0;
};

export const getTrainingDistance = (training: FullTraining) => {
  return getCoreDistance(training) + getWarmUpDistance(training) * 2;
};

export const getWarmUpDistance = (training: FullTraining) => {
  return training.type === TrainingType.speed ||
    training.type === TrainingType.strength ||
    training.type === TrainingType.timed
    ? training.warmUpDistance
    : 0;
};
