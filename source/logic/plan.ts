import { basePlan } from '../models';
import { DetailedPlan, DetailedTraining, DetailedWeek, Distance, Pace } from '../types';
import { getDetailedTraining } from './detailed-training';
import { getTrainingPaces } from './pace';
import { getWeekTotalStats } from './week';

export const getDetailedPlan = (warmUpDistance: Distance, racePace: Pace): DetailedPlan => {
  const trainingPaces = getTrainingPaces(racePace);

  return basePlan.map<DetailedWeek>((week) => {
    const detailedTrainings = week.trainings.map<DetailedTraining>((training) =>
      getDetailedTraining(training, trainingPaces, warmUpDistance)
    );
    const weekStats = getWeekTotalStats(detailedTrainings);

    return {
      number: week.number,
      totalDistance: weekStats.totalDistance,
      totalSeconds: weekStats.totalSeconds,
      trainings: detailedTrainings
    };
  });
};
