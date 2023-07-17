import { DetailedTraining } from './detailed-training';
import { OptionalDate } from './optional-date';
import { Stats } from './stats';
import { Training } from './training';

export type DetailedWeek = Stats & {
  isSkipped: boolean;
  number: number;
  startDate: OptionalDate;
  trainings: DetailedTraining[];
};

export type Week = {
  number: number;
  trainings: Training[];
};
