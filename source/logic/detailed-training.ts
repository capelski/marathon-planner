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
  TrainingPaces
} from '../types';
import { convertDistance, createDistance, mergeDistances, multiplyDistance } from './distance';

export const getDetailedModerateTraining = (
  trainingPaces: TrainingPaces,
  training: ModerateTraining
): DetailedModerateTraining => {
  const convertedDistance = convertDistance(
    training.distance,
    trainingPaces.moderate.distanceUnits
  );
  return {
    distance: convertedDistance,
    pace: trainingPaces.moderate,
    totalDistance: convertedDistance,
    type: training.type
  };
};

export const getDetailedRaceDay = (
  trainingPaces: TrainingPaces,
  training: RaceDay
): DetailedRaceDay => {
  const convertedDistance = convertDistance(training.distance, trainingPaces.race.distanceUnits);
  return {
    distance: convertedDistance,
    pace: trainingPaces.race,
    totalDistance: convertedDistance,
    type: training.type
  };
};

export const getDetailedRecoveryTraining = (
  trainingPaces: TrainingPaces,
  training: RecoveryTraining
): DetailedRecoveryTraining => {
  const convertedDistance = convertDistance(
    training.distance,
    trainingPaces.recovery.distanceUnits
  );
  return {
    distance: convertedDistance,
    pace: trainingPaces.recovery,
    totalDistance: convertedDistance,
    type: training.type
  };
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
  const convertedIntervalDistance = convertDistance(
    training.intervals.intervalDistance,
    trainingPaces.speed.distanceUnits
  );
  const convertedRecoveryDistance = convertDistance(
    training.intervals.recoveryDistance,
    trainingPaces.recovery.distanceUnits
  );
  const convertedWarmUpDistance = convertDistance(
    warmUpDistance,
    trainingPaces.recovery.distanceUnits
  );
  const totalDistance = mergeDistances(
    multiplyDistance(convertedIntervalDistance, training.intervals.intervalsNumber),
    multiplyDistance(convertedRecoveryDistance, training.intervals.intervalsNumber - 1),
    multiplyDistance(convertedWarmUpDistance, 2)
  )!;

  return {
    intervals: {
      intervalDistance: convertedIntervalDistance,
      intervalPace: trainingPaces.speed,
      intervalsNumber: training.intervals.intervalsNumber,
      recoveryDistance: convertedRecoveryDistance,
      recoveryPace: trainingPaces.recovery
    },
    totalDistance,
    type: training.type,
    warmUpDistance: convertedWarmUpDistance,
    warmUpPace: trainingPaces.recovery
  };
};

export const getDetailedStrengthTraining = (
  trainingPaces: TrainingPaces,
  training: StrengthTraining,
  warmUpDistance: Distance
): DetailedStrengthTraining => {
  const convertedIntervalDistance = convertDistance(
    training.intervals.intervalDistance,
    trainingPaces.strength.distanceUnits
  );
  const convertedRecoveryDistance = convertDistance(
    training.intervals.recoveryDistance,
    trainingPaces.recovery.distanceUnits
  );
  const convertedWarmUpDistance = convertDistance(
    warmUpDistance,
    trainingPaces.recovery.distanceUnits
  );
  const totalDistance = mergeDistances(
    multiplyDistance(convertedIntervalDistance, training.intervals.intervalsNumber),
    multiplyDistance(convertedRecoveryDistance, training.intervals.intervalsNumber - 1),
    multiplyDistance(convertedWarmUpDistance, 2)
  )!;

  return {
    intervals: {
      intervalDistance: convertedIntervalDistance,
      intervalPace: trainingPaces.strength,
      intervalsNumber: training.intervals.intervalsNumber,
      recoveryDistance: convertedRecoveryDistance,
      recoveryPace: trainingPaces.recovery
    },
    totalDistance,
    type: training.type,
    warmUpDistance: convertedWarmUpDistance,
    warmUpPace: trainingPaces.recovery
  };
};

export const getDetailedTimedTraining = (
  trainingPaces: TrainingPaces,
  training: TimedTraining,
  warmUpDistance: Distance
): DetailedTimedTraining => {
  const convertedDistance = convertDistance(training.distance, trainingPaces.timed.distanceUnits);
  const convertedWarmUpDistance = convertDistance(
    warmUpDistance,
    trainingPaces.timed.distanceUnits
  );
  const totalDistance = mergeDistances(
    convertedDistance,
    multiplyDistance(convertedWarmUpDistance, 2)
  )!;

  return {
    distance: convertedDistance,
    pace: trainingPaces.timed,
    totalDistance,
    type: training.type,
    warmUpDistance: convertedWarmUpDistance,
    warmUpPace: trainingPaces.recovery
  };
};
