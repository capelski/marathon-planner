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
import { convertDistance, createDistance, mergeDistances, multiplyDistance } from './distance';

const getDetailedDistanceTraining = <
  T extends LongRun | ModerateTraining | Race | RecoveryTraining
>(
  number: number,
  training: T,
  isTrainingCompleted: boolean,
  trainingPaces: TrainingPaces
): DetailedTraining => {
  const pace = trainingPaces[training.type];
  const convertedDistance = convertDistance(training.distance, pace.distanceUnits);
  return {
    category: TrainingCategory.distance,
    distance: { ...convertedDistance, pace },
    isCompleted: isTrainingCompleted,
    number,
    totalDistance: convertedDistance,
    totalSeconds: convertedDistance.value * pace.seconds,
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

  const convertedIntervalDistance = convertDistance(
    training.intervals.intervalDistance,
    mainPace.distanceUnits
  );
  const convertedRecoveryDistance = convertDistance(
    training.intervals.recoveryDistance,
    mainPace.distanceUnits
  );
  const convertedWarmUpDistance = convertDistance(warmUpDistance, mainPace.distanceUnits);
  const totalDistance = mergeDistances(
    multiplyDistance(convertedIntervalDistance, training.intervals.intervalsNumber),
    multiplyDistance(convertedRecoveryDistance, training.intervals.intervalsNumber - 1),
    multiplyDistance(convertedWarmUpDistance, 2)
  )!;

  return {
    category: TrainingCategory.intervals,
    intervals: {
      intervalDistance: { ...convertedIntervalDistance, pace: mainPace },
      intervalsNumber: training.intervals.intervalsNumber,
      recoveryDistance: { ...convertedRecoveryDistance, pace: recoveryPace }
    },
    isCompleted: isTrainingCompleted,
    number,
    totalDistance,
    totalSeconds:
      training.intervals.intervalsNumber * convertedIntervalDistance.value * mainPace.seconds +
      (training.intervals.intervalsNumber - 1) *
        convertedRecoveryDistance.value *
        recoveryPace.seconds +
      2 * convertedWarmUpDistance.value * recoveryPace.seconds,
    type: training.type,
    warmUpDistance: { ...convertedWarmUpDistance, pace: recoveryPace }
  };
};

export const getDetailedTraining = (
  number: number,
  training: Training,
  trainingPaces: TrainingPaces,
  warmUpDistance: Distance,
  isTrainingCompleted: boolean
): DetailedTraining => {
  return training.type === TrainingType.longRun ||
    training.type === TrainingType.moderate ||
    training.type === TrainingType.race ||
    training.type === TrainingType.recovery
    ? getDetailedDistanceTraining(number, training, isTrainingCompleted, trainingPaces)
    : training.type === TrainingType.rest
    ? {
        category: TrainingCategory.none,
        isCompleted: false,
        number,
        totalDistance: createDistance(0, trainingPaces.race.distanceUnits),
        totalSeconds: 0,
        type: training.type
      }
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

  const convertedDistance = convertDistance(training.distance, mainPace.distanceUnits);
  const convertedWarmUpDistance = convertDistance(warmUpDistance, mainPace.distanceUnits);
  const totalDistance = mergeDistances(
    convertedDistance,
    multiplyDistance(convertedWarmUpDistance, 2)
  )!;

  return {
    category: TrainingCategory.warmedUp,
    distance: { ...convertedDistance, pace: mainPace },
    isCompleted: isTrainingCompleted,
    number,
    totalDistance,
    totalSeconds:
      convertedDistance.value * mainPace.seconds +
      2 * convertedWarmUpDistance.value * recoveryPace.seconds,
    type: training.type,
    warmUpDistance: { ...convertedWarmUpDistance, pace: recoveryPace }
  };
};
