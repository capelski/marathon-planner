import { Dictionary, OptionalDate } from '../types';

const weekDays: Dictionary<string, number> = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday'
};

export const addDays = (date: Date, days: number) => {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);

  const dateTimezoneOffset = date.getTimezoneOffset();
  const nextDateTimezoneOffset = nextDate.getTimezoneOffset();
  const summertimeOffset = nextDateTimezoneOffset - dateTimezoneOffset;
  nextDate.setHours(nextDate.getHours() - summertimeOffset / 60);
  return nextDate;
};

export const dateToIsoString = (date: OptionalDate) =>
  date ? date.toISOString().split('T')[0] : '';

export const getDisplayWeekDays = (date: Date) => {
  // '2022-03-29', Tuesday, would be displayed as Monday in GMT-X
  const isoDate = localDateToIsoDate(date);
  const weekFirstDay = isoDate.getDay();
  return Array.from(Array(7).keys()).map((x) => weekDays[(x + weekFirstDay) % 7]);
};

export const isoStringToLocalDate = (string: string) => (string ? new Date(string) : undefined);

const localDateToIsoDate = (date: Date) => {
  const stringifiedIsoDate = dateToIsoString(date);
  const [year, month, day] = stringifiedIsoDate.split('-').map((x) => parseInt(x));
  return new Date(year, month - 1, day);
};
