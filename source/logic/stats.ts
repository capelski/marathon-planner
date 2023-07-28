import { DetailedTraining, DetailedWeek, Stats } from '../types';
import { createDistance, mergeDistances } from './distance';

export const getPlanTotalStats = (weeks: DetailedWeek[]): Stats => {
  const initialStats: Stats = {
    completed: {
      distance: createDistance(0, weeks[0].completed.distance.distanceUnits),
      seconds: 0
    },
    total: {
      distance: createDistance(0, weeks[0].total.distance.distanceUnits),
      seconds: 0
    }
  };

  return weeks
    .filter((week) => !week.isSkipped)
    .reduce((reducedStats, week) => {
      return {
        completed: {
          distance: mergeDistances(reducedStats.completed.distance, week.completed.distance),
          seconds: reducedStats.completed.seconds + week.completed.seconds
        },
        total: {
          distance: mergeDistances(reducedStats.total.distance, week.total.distance),
          seconds: reducedStats.total.seconds + week.total.seconds
        }
      };
    }, initialStats);
};

export const getWeekTotalStats = (detailedTrainings: DetailedTraining[]): Stats => {
  const initialStats: Stats = {
    completed: {
      distance: createDistance(0, detailedTrainings[0].totalDistance.distanceUnits),
      seconds: 0
    },
    total: {
      distance: createDistance(0, detailedTrainings[0].totalDistance.distanceUnits),
      seconds: 0
    }
  };

  return detailedTrainings.reduce((reducedStats, training) => {
    return {
      completed: training.isCompleted
        ? {
            distance: mergeDistances(reducedStats.completed.distance, training.totalDistance),
            seconds:
              reducedStats.completed.seconds +
              training.totalDistance.pace * training.totalDistance.value
          }
        : reducedStats.completed,
      total: {
        distance: mergeDistances(reducedStats.total.distance, training.totalDistance),
        seconds:
          reducedStats.total.seconds + training.totalDistance.pace * training.totalDistance.value
      }
    };
  }, initialStats);
};
