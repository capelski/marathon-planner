import { Settings } from '../types';
import { isoStringToLocalDate } from './dates';

const settingsKey = 'settings';

export const persistSettings = (settings: Settings) => {
  localStorage.setItem(settingsKey, JSON.stringify(settings));
};

export const retrieveSettings = (): Settings | undefined => {
  const stringifiedSettings = localStorage.getItem(settingsKey);
  let settings = undefined;

  if (stringifiedSettings) {
    settings = JSON.parse(stringifiedSettings);
    settings.startDate = isoStringToLocalDate(settings.startDate);
  }

  return settings;
};
