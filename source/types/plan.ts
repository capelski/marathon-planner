import { TotalStats } from './total-stats';
import { DetailedWeek, Week } from './week';

export type Plan = Week[];

export type DetailedPlan = TotalStats & {
  weeks: DetailedWeek[];
};
