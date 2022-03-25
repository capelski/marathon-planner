import { CollapsedWeeks } from '../types';

const collapsedWeeksKey = 'collapsedWeeks';

export const retrieveCollapsedWeeks = (): CollapsedWeeks | undefined => {
  const stringifiedCollapsedWeeks = localStorage.getItem(collapsedWeeksKey);

  const collapsedWeeks = stringifiedCollapsedWeeks
    ? JSON.parse(stringifiedCollapsedWeeks)
    : undefined;

  return collapsedWeeks;
};

export const persistCollapsedWeeks = (collapsedWeeks: CollapsedWeeks) => {
  localStorage.setItem(collapsedWeeksKey, JSON.stringify(collapsedWeeks));
};
