import { DetailedTraining } from './detailed-training';
import { TotalStats } from './total-stats';
import { Training } from './training';

export type DetailedWeek = TotalStats & {
  number: number;
  trainings: DetailedTraining[];
};

export type Week = {
  number: number;
  trainings: Training[];
};
