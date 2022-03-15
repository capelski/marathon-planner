import { DetailedTraining } from './detailed-training';
import { Distance } from './distance';
import { Training } from './training';

export type DetailedWeek = WeekStats & {
  number: number;
  trainings: DetailedTraining[];
};

export type Week = {
  number: number;
  trainings: Training[];
};

export type WeekStats = { totalDistance: Distance; totalSeconds: number };
