import { Dictionary } from '../types';

const weekDays: Dictionary<string, number> = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday'
};

export const dateToString = (date: Date | undefined) =>
  date ? date.toISOString().split('T')[0] : '';

export const getDisplayWeekDays = (date: Date) => {
  const weekFirstDay = date.getDay();
  return Array.from(Array(7).keys()).map((x) => weekDays[(x + weekFirstDay) % 7]);
};

export const stringToDate = (string: string) => (string ? new Date(string) : undefined);
