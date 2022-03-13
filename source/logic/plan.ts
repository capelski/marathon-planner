import { basePlan, TrainingType } from '../models';
import { FullPlan, FullWeek, Pace } from '../types';

export const getFullPlan = (warmUpDistance: number, _pace: Pace): FullPlan =>
  basePlan.map<FullWeek>((w) => ({
    number: w.number,
    trainings: w.trainings.map((t) =>
      t.type === TrainingType.moderate ||
      t.type === TrainingType.race ||
      t.type === TrainingType.recovery ||
      t.type === TrainingType.rest
        ? t
        : {
            ...t,
            warmUpDistance
          }
    )
  }));
