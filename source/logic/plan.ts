import { basePlan, TrainingType } from '../models';
import { DetailedPlan, DetailedTraining, DetailedWeek, Distance, Pace } from '../types';
import {
  getDetailedModerateTraining,
  getDetailedRaceDay,
  getDetailedRecoveryTraining,
  getDetailedRestDay,
  getDetailedSpeedTraining,
  getDetailedStrengthTraining,
  getDetailedTimedTraining
} from './detailed-training';
import { getTrainingPaces } from './pace';
import { getWeekDistance } from './week';

export const getDetailedPlan = (warmUpDistance: Distance, racePace: Pace): DetailedPlan => {
  const trainingPaces = getTrainingPaces(racePace);

  return basePlan.map<DetailedWeek>((week) => {
    const detailedTrainings = week.trainings.map<DetailedTraining>((training) =>
      training.type === TrainingType.moderate
        ? getDetailedModerateTraining(trainingPaces, training)
        : training.type === TrainingType.race
        ? getDetailedRaceDay(trainingPaces, training)
        : training.type === TrainingType.recovery
        ? getDetailedRecoveryTraining(trainingPaces, training)
        : training.type === TrainingType.rest
        ? getDetailedRestDay(trainingPaces, training)
        : training.type === TrainingType.speed
        ? getDetailedSpeedTraining(trainingPaces, training, warmUpDistance)
        : training.type === TrainingType.strength
        ? getDetailedStrengthTraining(trainingPaces, training, warmUpDistance)
        : getDetailedTimedTraining(trainingPaces, training, warmUpDistance)
    );

    return {
      number: week.number,
      totalDistance: getWeekDistance(detailedTrainings),
      trainings: detailedTrainings
    };
  });
};
