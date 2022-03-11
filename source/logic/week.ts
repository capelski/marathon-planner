import { FullWeek } from '../types';
import { getTrainingDistance } from './training';

export const getWeekDistance = (week: FullWeek) =>
  week.trainings.reduce((x, y) => x + getTrainingDistance(y), 0);
