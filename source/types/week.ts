import { DetailedTraining } from './detailed-training';
import { Distance } from './distance';
import { Training } from './training';

export type Week = {
  number: number;
  trainings: Training[];
};

export type DetailedWeek = {
  number: number;
  totalDistance: Distance;
  trainings: DetailedTraining[];
};
