import { Stats } from './stats';
import { DetailedWeek, Week } from './week';

export type Plan = Week[];

export type DetailedPlan = Stats & {
  weeks: DetailedWeek[];
};
