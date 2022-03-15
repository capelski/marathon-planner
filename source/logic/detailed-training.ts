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
  const convertedDistance = convertDistance(
    training.distance,
    trainingPaces[training.type].distanceUnits
  );
  return {
    category: TrainingCategory.distance,
    distance: { ...convertedDistance, pace: trainingPaces[training.type] },
    totalDistance: convertedDistance,
    type: training.type
  };
};

const getDetailedIntervalsTraining = <T extends SpeedTraining | StrengthTraining>(
  training: T,
  trainingPaces: TrainingPaces,
  warmUpDistance: Distance
): DetailedTraining => {
  const convertedIntervalDistance = convertDistance(
    training.intervals.intervalDistance,
    trainingPaces[training.type].distanceUnits
  );
  const convertedRecoveryDistance = convertDistance(
    training.intervals.recoveryDistance,
    trainingPaces[training.type].distanceUnits
  );
  const convertedWarmUpDistance = convertDistance(
    warmUpDistance,
    trainingPaces[training.type].distanceUnits
  );
  const totalDistance = mergeDistances(
    multiplyDistance(convertedIntervalDistance, training.intervals.intervalsNumber),
    multiplyDistance(convertedRecoveryDistance, training.intervals.intervalsNumber - 1),
    multiplyDistance(convertedWarmUpDistance, 2)
  )!;

  return {
    category: TrainingCategory.intervals,
    intervals: {
      intervalDistance: { ...convertedIntervalDistance, pace: trainingPaces[training.type] },
      intervalsNumber: training.intervals.intervalsNumber,
      recoveryDistance: { ...convertedRecoveryDistance, pace: trainingPaces[TrainingType.recovery] }
    },
    totalDistance,
    type: training.type,
    warmUpDistance: { ...convertedWarmUpDistance, pace: trainingPaces[TrainingType.recovery] }
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
  const convertedDistance = convertDistance(
    training.distance,
    trainingPaces[training.type].distanceUnits
  );
  const convertedWarmUpDistance = convertDistance(
    warmUpDistance,
    trainingPaces[training.type].distanceUnits
  );
  const totalDistance = mergeDistances(
    convertedDistance,
    multiplyDistance(convertedWarmUpDistance, 2)
  )!;

  return {
    category: TrainingCategory.warmedUp,
    distance: { ...convertedDistance, pace: trainingPaces[training.type] },
    totalDistance,
    type: training.type,
    warmUpDistance: { ...convertedWarmUpDistance, pace: trainingPaces[TrainingType.recovery] }
  };
};
