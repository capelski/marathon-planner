import { CompletedTrainings } from '../types';

const completedTrainingsKey = 'completed-trainings';

export const getIsTrainingCompleted = (
  completedTrainings: CompletedTrainings,
  weekNumber: number,
  trainingNumber: number
) => {
  const weekCompletedTrainings = completedTrainings[weekNumber] || {};
  return weekCompletedTrainings[trainingNumber] ?? false;
};

const persistCompletedTrainings = (completedTrainings: CompletedTrainings) => {
  localStorage.setItem(completedTrainingsKey, JSON.stringify(completedTrainings));
};

export const retrieveCompletedTrainings = (): CompletedTrainings | undefined => {
  const _completedTrainings = localStorage.getItem(completedTrainingsKey);
  return _completedTrainings ? JSON.parse(_completedTrainings) : undefined;
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

  persistCompletedTrainings(nextCompletedTrainings);

  return nextCompletedTrainings;
};
