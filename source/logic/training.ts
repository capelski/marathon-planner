import { TrainingType } from '../models';
import { FullTraining } from '../types';

export const getTrainingDistance = (training: FullTraining) =>
  training.type === TrainingType.moderate ||
  training.type === TrainingType.race ||
  training.type === TrainingType.recovery
    ? training.distance
    : training.type === TrainingType.timed
    ? training.distance + training.warmUpDistance * 2
    : training.type === TrainingType.speed || training.type === TrainingType.strength
    ? training.intervalDistance * training.intervalsNumber +
      training.intervalRecovery * (training.intervalsNumber - 1) +
      training.warmUpDistance * 2
    : 0;
