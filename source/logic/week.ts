import { DetailedTraining, WeekStats } from '../types';
import { createDistance, mergeDistances } from './distance';

export const getWeekTotalStats = (detailedTrainings: DetailedTraining[]) => {
  return detailedTrainings.reduce<WeekStats>(
    (x, y) => {
      return {
        totalDistance: mergeDistances(x.totalDistance, y.totalDistance),
        totalSeconds: x.totalSeconds + y.totalSeconds
      };
    },
    {
      totalDistance: createDistance(0, detailedTrainings[0].totalDistance.distanceUnits),
      totalSeconds: 0
    }
  );
};
