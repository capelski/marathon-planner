import { defaultBaseSettings, defaultCompletedTrainings, defaultSkippedWeeks } from '../constants';
import { Settings } from '../types';
import { isoStringToLocalDate } from './dates';

const settingsKey = 'settings';

export const persistSettings = (settings: Settings) => {
  localStorage.setItem(settingsKey, JSON.stringify(settings));
};

export const retrieveSettings = (): Settings | undefined => {
  const stringifiedSettings = localStorage.getItem(settingsKey);
  if (!stringifiedSettings) {
    return undefined;
  }

  const settings: Partial<Omit<Settings, 'startDate'> & { startDate: string }> =
    JSON.parse(stringifiedSettings);

  return <Settings>{
    completedTrainings: settings.completedTrainings || defaultCompletedTrainings,
    distanceUnits: settings.distanceUnits || defaultBaseSettings.distanceUnits,
    racePace: settings.racePace || defaultBaseSettings.racePace,
    skippedWeeks: settings.skippedWeeks || defaultSkippedWeeks,
    skipRecovery: settings.skipRecovery || defaultBaseSettings.skipRecovery,
    startDate: isoStringToLocalDate(settings.startDate),
    warmUpDistance: settings.warmUpDistance || defaultBaseSettings.warmUpDistance
  };
};
