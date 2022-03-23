import { basePlan } from '../models';
import {
  CompletedTrainings,
  DetailedPlan,
  DetailedTraining,
  DetailedWeek,
  Distance,
  Pace
} from '../types';
import { getIsTrainingCompleted } from './completed-trainings';
import { getDetailedTraining } from './detailed-training';
import { getTrainingPaces } from './pace';
import { getPlanTotalStats, getWeekTotalStats } from './stats';

export const getDetailedPlan = (
  warmUpDistance: Distance,
  racePace: Pace,
  completedTrainings: CompletedTrainings
): DetailedPlan => {
  const trainingPaces = getTrainingPaces(racePace);
  const weeks = basePlan.map<DetailedWeek>((week) => {
    const detailedTrainings = week.trainings.map<DetailedTraining>((training, index) =>
      getDetailedTraining(
        index,
        training,
        trainingPaces,
        warmUpDistance,
        getIsTrainingCompleted(completedTrainings, week.number, index)
      )
    );
    const weekStats = getWeekTotalStats(detailedTrainings);

    return {
      ...weekStats,
      number: week.number,
      trainings: detailedTrainings
    };
  });
  const totalStats = getPlanTotalStats(weeks);

  return {
    ...totalStats,
    weeks
  };
};
