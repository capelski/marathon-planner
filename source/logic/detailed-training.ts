import { TrainingCategory, TrainingType } from '../models';
import {
  DetailedTraining,
  Distance,
  LongRun,
  ModerateTraining,
  RaceDay,
  RecoveryTraining,
  SpeedTraining,
  StrengthTraining,
  TimedTraining,
  Training,
  TrainingPaces
} from '../types';
import { convertDistance, createDistance, mergeDistances, multiplyDistance } from './distance';

const getDetailedDistanceTraining = <
  T extends LongRun | ModerateTraining | RaceDay | RecoveryTraining
>(
  training: T,
  trainingPaces: TrainingPaces
): DetailedTraining => {
  const pace = trainingPaces[training.type];
  const convertedDistance = convertDistance(training.distance, pace.distanceUnits);
  return {
    category: TrainingCategory.distance,
    distance: { ...convertedDistance, pace },
    totalDistance: convertedDistance,
    totalSeconds: convertedDistance.value * pace.seconds,
    type: training.type
  };
};

const getDetailedIntervalsTraining = <T extends SpeedTraining | StrengthTraining>(
  training: T,
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
  training: Training,
  trainingPaces: TrainingPaces,
  warmUpDistance: Distance
): DetailedTraining => {
  return training.type === TrainingType.longRun ||
    training.type === TrainingType.moderate ||
    training.type === TrainingType.race ||
    training.type === TrainingType.recovery
    ? getDetailedDistanceTraining(training, trainingPaces)
    : training.type === TrainingType.rest
    ? {
        category: TrainingCategory.none,
        totalDistance: createDistance(0, trainingPaces.race.distanceUnits),
        totalSeconds: 0,
        type: training.type
      }
    : training.type === TrainingType.speed || training.type === TrainingType.strength
    ? getDetailedIntervalsTraining(training, trainingPaces, warmUpDistance)
    : getDetailedWarmedUpTraining(training, trainingPaces, warmUpDistance);
};

const getDetailedWarmedUpTraining = <T extends TimedTraining>(
  training: T,
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
    totalDistance,
    totalSeconds:
      convertedDistance.value * mainPace.seconds +
      2 * convertedWarmUpDistance.value * recoveryPace.seconds,
    type: training.type,
    warmUpDistance: { ...convertedWarmUpDistance, pace: recoveryPace }
  };
};
