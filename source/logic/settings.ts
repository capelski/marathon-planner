import { Settings } from '../types';

const settingsKey = 'settings';

export const persistSettings = (settings: Settings) => {
  localStorage.setItem(settingsKey, JSON.stringify(settings));
};

export const retrieveSettings = (): Settings | undefined => {
  const stringifiedSettings = localStorage.getItem(settingsKey);
  let settings = undefined;

  if (stringifiedSettings) {
    settings = JSON.parse(stringifiedSettings);
    settings.startDate = new Date(settings.startDate);
  }

  return settings;
};
