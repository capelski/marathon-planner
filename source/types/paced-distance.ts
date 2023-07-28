import { Distance } from './distance';

export type PacedDistance = Distance & {
  /** The number of seconds it takes to complete each distance unit */
  pace: number;
};
