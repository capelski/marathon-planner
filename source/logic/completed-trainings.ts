import { CompletedTrainings } from '../types';

export const getIsTrainingCompleted = (
  completedTrainings: CompletedTrainings,
  weekNumber: number,
  trainingNumber: number
) => {
  const weekCompletedTrainings = completedTrainings[weekNumber] || {};
  return weekCompletedTrainings[trainingNumber] ?? false;
};

export const toggleTrainingCompleted = (
  completedTrainings: CompletedTrainings,
  weekNumber: number,
  trainingNumber: number
) => {
  const nextCompletedTrainings = {
    ...completedTrainings,
    [weekNumber]: {
      ...completedTrainings?.[weekNumber],
      [trainingNumber]: !completedTrainings?.[weekNumber]?.[trainingNumber]
    }
  };

  return nextCompletedTrainings;
};
