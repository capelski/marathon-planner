import { TrainingType } from '../models';
import {
  DetailedModerateTraining,
  DetailedRaceDay,
  DetailedRecoveryTraining,
  DetailedRestDay,
  DetailedSpeedTraining,
  DetailedStrengthTraining,
  DetailedTimedTraining,
  Distance,
  ModerateTraining,
  RaceDay,
  RecoveryTraining,
  RestDay,
  SpeedTraining,
  StrengthTraining,
  TimedTraining,
  TrainingIntervals,
  TrainingPaces
} from '../types';
import { convertDistance, createDistance, mergeDistances, multiplyDistance } from './distance';

const getDetailedDistanceTraining = <
  T extends TrainingType.moderate | TrainingType.race | TrainingType.recovery
>(
  distance: Distance,
  trainingPaces: TrainingPaces,
  type: T
) => {
  const convertedDistance = convertDistance(distance, trainingPaces[type].distanceUnits);
  return {
    distance: { ...convertedDistance, pace: trainingPaces[type] },
    totalDistance: convertedDistance,
    type: type
  };
};

const getDetailedIntervalsTraining = <T extends TrainingType.speed | TrainingType.strength>(
  intervals: TrainingIntervals,
  warmUpDistance: Distance,
  trainingPaces: TrainingPaces,
  type: T
) => {
  const convertedIntervalDistance = convertDistance(
    intervals.intervalDistance,
    trainingPaces[type].distanceUnits
  );
  const convertedRecoveryDistance = convertDistance(
    intervals.recoveryDistance,
    trainingPaces[type].distanceUnits
  );
  const convertedWarmUpDistance = convertDistance(
    warmUpDistance,
    trainingPaces[type].distanceUnits
  );
  const totalDistance = mergeDistances(
    multiplyDistance(convertedIntervalDistance, intervals.intervalsNumber),
    multiplyDistance(convertedRecoveryDistance, intervals.intervalsNumber - 1),
    multiplyDistance(convertedWarmUpDistance, 2)
  )!;

  return {
    intervals: {
      intervalDistance: { ...convertedIntervalDistance, pace: trainingPaces[type] },
      intervalsNumber: intervals.intervalsNumber,
      recoveryDistance: { ...convertedRecoveryDistance, pace: trainingPaces[TrainingType.recovery] }
    },
    totalDistance,
    type,
    warmUpDistance: { ...convertedWarmUpDistance, pace: trainingPaces[TrainingType.recovery] }
  };
};

export const getDetailedModerateTraining = (
  trainingPaces: TrainingPaces,
  training: ModerateTraining
): DetailedModerateTraining => {
  return getDetailedDistanceTraining(training.distance, trainingPaces, training.type);
};

export const getDetailedRaceDay = (
  trainingPaces: TrainingPaces,
  training: RaceDay
): DetailedRaceDay => {
  return getDetailedDistanceTraining(training.distance, trainingPaces, training.type);
};

export const getDetailedRecoveryTraining = (
  trainingPaces: TrainingPaces,
  training: RecoveryTraining
): DetailedRecoveryTraining => {
  return getDetailedDistanceTraining(training.distance, trainingPaces, training.type);
};

export const getDetailedRestDay = (
  trainingPaces: TrainingPaces,
  training: RestDay
): DetailedRestDay => {
  return {
    totalDistance: createDistance(0, trainingPaces.race.distanceUnits),
    type: training.type
  };
};

export const getDetailedSpeedTraining = (
  trainingPaces: TrainingPaces,
  training: SpeedTraining,
  warmUpDistance: Distance
): DetailedSpeedTraining => {
  return getDetailedIntervalsTraining(
    training.intervals,
    warmUpDistance,
    trainingPaces,
    training.type
  );
};

export const getDetailedStrengthTraining = (
  trainingPaces: TrainingPaces,
  training: StrengthTraining,
  warmUpDistance: Distance
): DetailedStrengthTraining => {
  return getDetailedIntervalsTraining(
    training.intervals,
    warmUpDistance,
    trainingPaces,
    training.type
  );
};

export const getDetailedTimedTraining = (
  trainingPaces: TrainingPaces,
  training: TimedTraining,
  warmUpDistance: Distance
): DetailedTimedTraining => {
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
    distance: { ...convertedDistance, pace: trainingPaces[training.type] },
    totalDistance,
    type: training.type,
    warmUpDistance: { ...convertedWarmUpDistance, pace: trainingPaces[TrainingType.recovery] }
  };
};
