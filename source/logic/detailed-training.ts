import { TrainingCategory, TrainingType } from '../models';
import {
  DetailedTraining,
  Distance,
  EasyTraining,
  Marathon,
  ModerateTraining,
  RecoveryTraining,
  Simulator,
  SpeedTraining,
  StrengthTraining,
  TimedTraining,
  Training,
  TrainingPaces
} from '../types';
import { createDistance } from './distance';
import { getPacedDistance, mergePacedDistances, multiplyPacedDistance } from './paced-distance';

const getDetailedDistanceTraining = <
  T extends EasyTraining | Marathon | ModerateTraining | RecoveryTraining
>(
  number: number,
  training: T,
  isTrainingCompleted: boolean,
  trainingPaces: TrainingPaces,
  startDate?: Date
): DetailedTraining => {
  const pace = trainingPaces[training.type];
  const pacedDistance = getPacedDistance(training.distance, pace);

  return {
    category: TrainingCategory.distance,
    isCompleted: isTrainingCompleted,
    number,
    startDate,
    totalDistance: pacedDistance,
    type: training.type
  };
};

const getDetailedIntervalsTraining = <T extends SpeedTraining | StrengthTraining>(
  number: number,
  training: T,
  isTrainingCompleted: boolean,
  trainingPaces: TrainingPaces,
  warmUpDistance: Distance,
  startDate?: Date
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
    startDate,
    totalDistance,
    type: training.type,
    warmUpDistance: pacedWarmedUpDistance
  };
};

const getDetailedRestTraining = (
  number: number,
  trainingPaces: TrainingPaces,
  startDate?: Date
): DetailedTraining => ({
  category: TrainingCategory.none,
  isCompleted: false,
  number,
  startDate,
  totalDistance: getPacedDistance(
    createDistance(0, trainingPaces.rest.distanceUnits),
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
  skipRecovery: boolean,
  startDate?: Date
): DetailedTraining => {
  if (skipRecovery && training.type === TrainingType.recovery) {
    return getDetailedRestTraining(number, trainingPaces, startDate);
  }

  return training.type === TrainingType.easy ||
    training.type === TrainingType.marathon ||
    training.type === TrainingType.moderate ||
    training.type === TrainingType.recovery
    ? getDetailedDistanceTraining(number, training, isTrainingCompleted, trainingPaces, startDate)
    : training.type === TrainingType.rest
    ? getDetailedRestTraining(number, trainingPaces, startDate)
    : training.type === TrainingType.speed || training.type === TrainingType.strength
    ? getDetailedIntervalsTraining(
        number,
        training,
        isTrainingCompleted,
        trainingPaces,
        warmUpDistance,
        startDate
      )
    : getDetailedWarmedUpTraining(
        number,
        training,
        isTrainingCompleted,
        trainingPaces,
        training.type === TrainingType.simulator
          ? createDistance(1.5, warmUpDistance.distanceUnits)
          : warmUpDistance,
        startDate
      );
};

const getDetailedWarmedUpTraining = <T extends TimedTraining | Simulator>(
  number: number,
  training: T,
  isTrainingCompleted: boolean,
  trainingPaces: TrainingPaces,
  warmUpDistance: Distance,
  startDate?: Date
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
    startDate,
    totalDistance,
    type: training.type,
    warmUpDistance: pacedWarmUpDistance
  };
};
