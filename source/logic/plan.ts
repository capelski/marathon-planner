import { basePlan } from '../models';
import { Configuration, DetailedPlan, DetailedTraining, DetailedWeek } from '../types';
import { getIsTrainingCompleted } from './completed-trainings';
import { addDays } from './dates';
import { getDetailedTraining } from './detailed-training';
import { getTrainingPaces } from './pace';
import { getIsSkippedWeek } from './skipped-weeks';
import { getPlanTotalStats, getWeekTotalStats } from './stats';

export const getDetailedPlan = ({
  completedTrainings,
  settings: { racePace, skipRecovery, warmUpDistance },
  skippedWeeks,
  startDate
}: Configuration): DetailedPlan => {
  const trainingPaces = getTrainingPaces(racePace);
  let startDateOffset = 0;
  const weeks = basePlan.map<DetailedWeek>((week) => {
    const isSkipped = getIsSkippedWeek(skippedWeeks, week.number);

    let weekStartDate: Date | undefined = undefined;
    if (startDate && !isSkipped) {
      weekStartDate = addDays(startDate, startDateOffset);
      startDateOffset += 7;
    }

    const detailedTrainings = week.trainings.map<DetailedTraining>((training, index) =>
      getDetailedTraining(
        index,
        training,
        trainingPaces,
        warmUpDistance,
        getIsTrainingCompleted(completedTrainings, week.number, index),
        skipRecovery,
        weekStartDate && addDays(weekStartDate, index)
      )
    );

    const weekStats = getWeekTotalStats(detailedTrainings);

    return {
      ...weekStats,
      isSkipped,
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
