import { basePlan } from '../models';
import { DetailedPlan, DetailedTraining, DetailedWeek, Distance, Pace, TotalStats } from '../types';
import { getDetailedTraining } from './detailed-training';
import { createDistance, mergeDistances } from './distance';
import { getTrainingPaces } from './pace';
import { getWeekTotalStats } from './week';

export const getDetailedPlan = (warmUpDistance: Distance, racePace: Pace): DetailedPlan => {
  const trainingPaces = getTrainingPaces(racePace);
  const weeks = basePlan.map<DetailedWeek>((week) => {
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
  const totalStats = getPlanTotalStats(weeks);

  return {
    ...totalStats,
    weeks
  };
};

export const getPlanTotalStats = (weeks: DetailedWeek[]) => {
  return weeks.reduce<TotalStats>(
    (x, y) => {
      return {
        totalDistance: mergeDistances(x.totalDistance, y.totalDistance),
        totalSeconds: x.totalSeconds + y.totalSeconds
      };
    },
    {
      totalDistance: createDistance(0, weeks[0].totalDistance.distanceUnits),
      totalSeconds: 0
    }
  );
};
