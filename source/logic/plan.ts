import { basePlan } from '../models';
import { DetailedPlan, DetailedTraining, DetailedWeek, OptionalDate, Settings } from '../types';
import { getIsTrainingCompleted } from './completed-trainings';
import { addDays } from './dates';
import { getDetailedTraining } from './detailed-training';
import { getTrainingPaces } from './pace';
import { getPlanTotalStats, getWeekTotalStats } from './stats';

export const getDetailedPlan = ({
  completedTrainings,
  racePace,
  startDate,
  warmUpDistance
}: Settings): DetailedPlan => {
  const trainingPaces = getTrainingPaces(racePace);
  const weeks = basePlan.map<DetailedWeek>((week, weekIndex) => {
    const detailedTrainings = week.trainings.map<DetailedTraining>((training, index) =>
      getDetailedTraining(
        index,
        training,
        trainingPaces,
        warmUpDistance,
        getIsTrainingCompleted(completedTrainings, week.number, index)
      )
    );

    let weekStartDate: OptionalDate = undefined;
    if (startDate) {
      weekStartDate = addDays(startDate, weekIndex * 7);
    }

    const weekStats = getWeekTotalStats(detailedTrainings);

    return {
      ...weekStats,
      number: week.number,
      startDate: weekStartDate,
      trainings: detailedTrainings
    };
  });
  const totalStats = getPlanTotalStats(weeks);

  return {
    ...totalStats,
    weeks
  };
};
