import { TrainingType } from '../models';
import { DetailedTraining, Distance, Training, TrainingIntervals, TrainingPaces } from '../types';
import { convertDistance, createDistance, mergeDistances, multiplyDistance } from './distance';

const getDetailedDistanceTraining = <
  T extends TrainingType.moderate | TrainingType.race | TrainingType.recovery | TrainingType.rest
>(
  distance: Distance,
  trainingPaces: TrainingPaces,
  type: T
): DetailedTraining => {
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
): DetailedTraining => {
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

export const getDetailedTraining = (
  training: Training,
  trainingPaces: TrainingPaces,
  warmUpDistance: Distance
): DetailedTraining => {
  return training.type === TrainingType.moderate ||
    training.type === TrainingType.race ||
    training.type === TrainingType.recovery
    ? getDetailedDistanceTraining(training.distance, trainingPaces, training.type)
    : training.type === TrainingType.rest
    ? getDetailedDistanceTraining(
        createDistance(0, trainingPaces.race.distanceUnits),
        trainingPaces,
        training.type
      )
    : training.type === TrainingType.speed || training.type === TrainingType.strength
    ? getDetailedIntervalsTraining(training.intervals, warmUpDistance, trainingPaces, training.type)
    : getDetailedTimedTraining(training.distance, trainingPaces, warmUpDistance, training.type);
};

const getDetailedTimedTraining = <T extends TrainingType.timed>(
  distance: Distance,
  trainingPaces: TrainingPaces,
  warmUpDistance: Distance,
  type: T
): DetailedTraining => {
  const convertedDistance = convertDistance(distance, trainingPaces[type].distanceUnits);
  const convertedWarmUpDistance = convertDistance(
    warmUpDistance,
    trainingPaces[type].distanceUnits
  );
  const totalDistance = mergeDistances(
    convertedDistance,
    multiplyDistance(convertedWarmUpDistance, 2)
  )!;

  return {
    distance: { ...convertedDistance, pace: trainingPaces[type] },
    totalDistance,
    type,
    warmUpDistance: { ...convertedWarmUpDistance, pace: trainingPaces[TrainingType.recovery] }
  };
};
