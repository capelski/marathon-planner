import { TrainingType } from '../models';
import { DetailedTrainingIntervals, DetailedTraining } from '../types';

export const getIntervals = (training: DetailedTraining): DetailedTrainingIntervals | undefined => {
  return training.type === TrainingType.speed || training.type === TrainingType.strength
    ? training.intervals
    : undefined;
};

export const getRegularDistance = (training: DetailedTraining) => {
  return training.type === TrainingType.moderate ||
    training.type === TrainingType.race ||
    training.type === TrainingType.recovery ||
    training.type === TrainingType.timed
    ? training.distance
    : undefined;
};

export const getRegularPace = (training: DetailedTraining) => {
  return training.type === TrainingType.moderate ||
    training.type === TrainingType.race ||
    training.type === TrainingType.recovery ||
    training.type === TrainingType.timed
    ? training.distance.pace
    : undefined;
};

export const getWarmUpDistance = (training: DetailedTraining) => {
  return training.type === TrainingType.speed ||
    training.type === TrainingType.strength ||
    training.type === TrainingType.timed
    ? training.warmUpDistance
    : undefined;
};

export const getWarmUpPace = (training: DetailedTraining) => {
  return training.type === TrainingType.timed ||
    training.type === TrainingType.speed ||
    training.type === TrainingType.strength
    ? training.warmUpDistance.pace
    : undefined;
};
