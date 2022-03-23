import { Distance } from './distance';

export type Stats = {
  completed: {
    distance: Distance;
    seconds: number;
  };
  total: {
    distance: Distance;
    seconds: number;
  };
};
