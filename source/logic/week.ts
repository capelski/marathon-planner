import { DetailedTraining, Distance } from '../types';
import { createDistance, mergeDistances } from './distance';

export const getWeekDistance = (detailedTrainings: DetailedTraining[]) => {
  return detailedTrainings
    .map<Distance>((training) => training.totalDistance)
    .reduce(
      (x, y) => mergeDistances(x, y),
      createDistance(0, detailedTrainings[0].totalDistance.distanceUnits)
    );
};
