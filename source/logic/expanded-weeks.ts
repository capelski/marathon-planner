import { DetailedPlan, ExpandedWeeks } from '../types';

export const getIsExpandedWeek = (expandedWeeks: ExpandedWeeks, weekNumber: number) => {
  return expandedWeeks[weekNumber] ?? false;
};

export const toggleAllExpandedWeeks = (plan: DetailedPlan, expandAll: boolean) => {
  const nextExpandedWeeks = expandAll
    ? plan.weeks.reduce((expandedWeeks, week) => ({ ...expandedWeeks, [week.number]: true }), {})
    : {};

  return nextExpandedWeeks;
};

export const toggleExpandedWeek = (expandedWeeks: ExpandedWeeks, weekNumber: number) => {
  const nextExpandedWeeks = {
    ...expandedWeeks,
    [weekNumber]: !expandedWeeks[weekNumber]
  };

  return nextExpandedWeeks;
};
