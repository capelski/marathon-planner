import { CollapsedWeeks, DetailedPlan } from '../types';

export const getIsCollapsedWeek = (collapsedWeeks: CollapsedWeeks, weekNumber: number) => {
  return collapsedWeeks[weekNumber] ?? false;
};

export const toggleAllCollapsedWeeks = (plan: DetailedPlan, collapseAll: boolean) => {
  const nextCollapsedWeeks = collapseAll
    ? plan.weeks.reduce((collapsedWeeks, week) => ({ ...collapsedWeeks, [week.number]: true }), {})
    : {};

  return nextCollapsedWeeks;
};

export const toggleCollapsedWeek = (collapsedWeeks: CollapsedWeeks, weekNumber: number) => {
  const nextCollapsedWeeks = {
    ...collapsedWeeks,
    [weekNumber]: !collapsedWeeks[weekNumber]
  };

  return nextCollapsedWeeks;
};
