import { basePlan } from '../models';
import { DetailedPlan, DetailedTraining, DetailedWeek, Distance, Pace } from '../types';
import { getDetailedTraining } from './detailed-training';
import { getTrainingPaces } from './pace';
import { getWeekDistance } from './week';

export const getDetailedPlan = (warmUpDistance: Distance, racePace: Pace): DetailedPlan => {
  const trainingPaces = getTrainingPaces(racePace);

  return basePlan.map<DetailedWeek>((week) => {
    const detailedTrainings = week.trainings.map<DetailedTraining>((training) =>
      getDetailedTraining(training, trainingPaces, warmUpDistance)
    );

    return {
      number: week.number,
      totalDistance: getWeekDistance(detailedTrainings),
      trainings: detailedTrainings
    };
  });
};
