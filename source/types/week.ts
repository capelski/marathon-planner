import { DetailedTraining } from './detailed-training';
import { Stats } from './stats';
import { Training } from './training';

export type DetailedWeek = Stats & {
  number: number;
  startDate: Date | undefined;
  trainings: DetailedTraining[];
};

export type Week = {
  number: number;
  trainings: Training[];
};
