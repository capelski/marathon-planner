import { SkippedWeeks } from '../types';

export const getIsSkippedWeek = (skippedWeeks: SkippedWeeks, weekNumber: number) => {
  return skippedWeeks[weekNumber] ?? false;
};

export const toggleSkippedWeek = (skippedWeeks: SkippedWeeks, weekNumber: number) => {
  const nextCompletedTrainings = {
    ...skippedWeeks,
    [weekNumber]: !skippedWeeks[weekNumber]
  };

  return nextCompletedTrainings;
};
