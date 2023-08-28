import { Distance } from './distance';

export type StatsFact = {
  distance: Distance;
  seconds: number;
};

export type Stats = {
  completed: StatsFact;
  missed: StatsFact;
  remaining: StatsFact;
  total: StatsFact;
};
