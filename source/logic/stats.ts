import { DistanceUnits, TrainingType } from '../models';
import { DetailedTraining, DetailedWeek, Stats, StatsFact } from '../types';
import { createDistance, mergeDistances } from './distance';

const createStatsFact = (distanceUnits: DistanceUnits): StatsFact => ({
  distance: createDistance(0, distanceUnits),
  seconds: 0
});

const createStats = (distanceUnits: DistanceUnits): Stats => ({
  completed: createStatsFact(distanceUnits),
  missed: createStatsFact(distanceUnits),
  remaining: createStatsFact(distanceUnits),
  total: createStatsFact(distanceUnits)
});

const processDetailedTraining = (
  statsFact: StatsFact,
  detailedTraining: DetailedTraining
): StatsFact => ({
  distance: mergeDistances(statsFact.distance, detailedTraining.totalDistance),
  seconds:
    statsFact.seconds + detailedTraining.totalDistance.pace * detailedTraining.totalDistance.value
});

const processWeek = (statsFact: StatsFact, weekStatsFact: StatsFact): StatsFact => ({
  distance: mergeDistances(statsFact.distance, weekStatsFact.distance),
  seconds: statsFact.seconds + weekStatsFact.seconds
});

export const getPlanTotalStats = (weeks: DetailedWeek[]): Stats => {
  const initialStats = createStats(weeks[0].completed.distance.distanceUnits);

  return weeks
    .filter((week) => !week.isSkipped)
    .reduce((reducedStats, week) => {
      return {
        completed: processWeek(reducedStats.completed, week.completed),
        missed: processWeek(reducedStats.missed, week.missed),
        remaining: processWeek(reducedStats.remaining, week.remaining),
        total: processWeek(reducedStats.total, week.total)
      };
    }, initialStats);
};

export const getWeekTotalStats = (detailedTrainings: DetailedTraining[]): Stats => {
  const initialStats = createStats(detailedTrainings[0].totalDistance.distanceUnits);

  return detailedTrainings.reduce((reducedStats, training) => {
    const now = new Date();
    const timelessDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const isPastTraining = training.startDate && training.startDate < timelessDate;

    return training.type === TrainingType.marathon
      ? reducedStats
      : {
          completed: training.isCompleted
            ? processDetailedTraining(reducedStats.completed, training)
            : reducedStats.completed,
          missed:
            !training.isCompleted && isPastTraining
              ? processDetailedTraining(reducedStats.missed, training)
              : reducedStats.missed,
          remaining:
            !training.isCompleted && !isPastTraining
              ? processDetailedTraining(reducedStats.remaining, training)
              : reducedStats.remaining,
          total: processDetailedTraining(reducedStats.total, training)
        };
  }, initialStats);
};
