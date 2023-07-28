import { TrainingCategory, TrainingType } from '../models';
import {
  DetailedTraining,
  Distance,
  LongRun,
  ModerateTraining,
  Race,
  RecoveryTraining,
  SpeedTraining,
  StrengthTraining,
  TimedTraining,
  Training,
  TrainingPaces
} from '../types';
import { createDistance } from './distance';
import { getPacedDistance, mergePacedDistances, multiplyPacedDistance } from './paced-distance';

const getDetailedDistanceTraining = <
  T extends LongRun | ModerateTraining | Race | RecoveryTraining
>(
  number: number,
  training: T,
  isTrainingCompleted: boolean,
  trainingPaces: TrainingPaces
): DetailedTraining => {
  const pace = trainingPaces[training.type];
  const pacedDistance = getPacedDistance(training.distance, pace);

  return {
    category: TrainingCategory.distance,
    isCompleted: isTrainingCompleted,
    number,
    totalDistance: pacedDistance,
    type: training.type
  };
};

const getDetailedIntervalsTraining = <T extends SpeedTraining | StrengthTraining>(
  number: number,
  training: T,
  isTrainingCompleted: boolean,
  trainingPaces: TrainingPaces,
  warmUpDistance: Distance
): DetailedTraining => {
  const mainPace = trainingPaces[training.type];
  const recoveryPace = trainingPaces[TrainingType.recovery];

  const pacedIntervalDistance = getPacedDistance(training.intervals.intervalDistance, mainPace);
  const pacedRecoveryDistance = getPacedDistance(training.intervals.recoveryDistance, recoveryPace);
  const pacedWarmedUpDistance = getPacedDistance(warmUpDistance, recoveryPace);

  const totalDistance = mergePacedDistances(
    multiplyPacedDistance(pacedIntervalDistance, training.intervals.intervalsNumber),
    multiplyPacedDistance(pacedRecoveryDistance, training.intervals.intervalsNumber - 1),
    multiplyPacedDistance(pacedWarmedUpDistance, 2)
  );

  return {
    category: TrainingCategory.intervals,
    intervals: {
      intervalDistance: pacedIntervalDistance,
      intervalsNumber: training.intervals.intervalsNumber,
      recoveryDistance: pacedRecoveryDistance
    },
    isCompleted: isTrainingCompleted,
    number,
    totalDistance,
    type: training.type,
    warmUpDistance: pacedWarmedUpDistance
  };
};

const getDetailedRestTraining = (
  number: number,
  trainingPaces: TrainingPaces
): DetailedTraining => ({
  category: TrainingCategory.none,
  isCompleted: false,
  number,
  totalDistance: getPacedDistance(
    createDistance(0, trainingPaces.race.distanceUnits),
    trainingPaces.rest
  ),
  type: TrainingType.rest
});

export const getDetailedTraining = (
  number: number,
  training: Training,
  trainingPaces: TrainingPaces,
  warmUpDistance: Distance,
  isTrainingCompleted: boolean,
  skipRecovery: boolean
): DetailedTraining => {
  if (skipRecovery && training.type === TrainingType.recovery) {
    return getDetailedRestTraining(number, trainingPaces);
  }

  return training.type === TrainingType.longRun ||
    training.type === TrainingType.moderate ||
    training.type === TrainingType.race ||
    training.type === TrainingType.recovery
    ? getDetailedDistanceTraining(number, training, isTrainingCompleted, trainingPaces)
    : training.type === TrainingType.rest
    ? getDetailedRestTraining(number, trainingPaces)
    : training.type === TrainingType.speed || training.type === TrainingType.strength
    ? getDetailedIntervalsTraining(
        number,
        training,
        isTrainingCompleted,
        trainingPaces,
        warmUpDistance
      )
    : getDetailedWarmedUpTraining(
        number,
        training,
        isTrainingCompleted,
        trainingPaces,
        warmUpDistance
      );
};

const getDetailedWarmedUpTraining = <T extends TimedTraining>(
  number: number,
  training: T,
  isTrainingCompleted: boolean,
  trainingPaces: TrainingPaces,
  warmUpDistance: Distance
): DetailedTraining => {
  const mainPace = trainingPaces[training.type];
  const recoveryPace = trainingPaces[TrainingType.recovery];

  const pacedDistance = getPacedDistance(training.distance, mainPace);
  const pacedWarmUpDistance = getPacedDistance(warmUpDistance, recoveryPace);

  const totalDistance = mergePacedDistances(
    pacedDistance,
    multiplyPacedDistance(pacedWarmUpDistance, 2)
  );

  return {
    category: TrainingCategory.warmedUp,
    distance: pacedDistance,
    isCompleted: isTrainingCompleted,
    number,
    totalDistance,
    type: training.type,
    warmUpDistance: pacedWarmUpDistance
  };
};
