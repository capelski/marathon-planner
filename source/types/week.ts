import { BaseTraining, FullTraining } from './training';

export type BaseWeek = {
  number: number;
  trainings: BaseTraining[];
};

export type FullWeek = {
  number: number;
  trainings: FullTraining[];
};
