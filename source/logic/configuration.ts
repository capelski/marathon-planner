import { defaultConfiguration } from '../constants';
import { Configuration, Settings } from '../types';
import { isoStringToLocalDate } from './dates';

const configurationKey = 'settings';

type SerializedSettings = Omit<Settings, 'startDate'> & { startDate: string };
type SerializedConfiguration = Omit<Configuration, 'settings'> & { settings: SerializedSettings };

export const persistConfiguration = (configuration: Configuration) => {
  localStorage.setItem(configurationKey, JSON.stringify(configuration));
};

export const retrieveConfiguration = (): Configuration | undefined => {
  const stringifiedConfiguration = localStorage.getItem(configurationKey);
  if (!stringifiedConfiguration) {
    return undefined;
  }

  const partialConfiguration: Partial<SerializedConfiguration> =
    JSON.parse(stringifiedConfiguration);

  const configuration: Configuration = {
    collapsedWeeks: partialConfiguration.collapsedWeeks ?? defaultConfiguration.collapsedWeeks,
    completedTrainings:
      partialConfiguration.completedTrainings ?? defaultConfiguration.completedTrainings,
    settings: {
      distanceUnits:
        partialConfiguration.settings?.distanceUnits ?? defaultConfiguration.settings.distanceUnits,
      racePace: partialConfiguration.settings?.racePace ?? defaultConfiguration.settings.racePace,
      skipRecovery:
        partialConfiguration.settings?.skipRecovery ?? defaultConfiguration.settings.skipRecovery,
      startDate: isoStringToLocalDate(partialConfiguration.settings?.startDate),
      warmUpDistance:
        defaultConfiguration.settings.warmUpDistance ?? defaultConfiguration.settings.warmUpDistance
    },
    skippedWeeks: partialConfiguration.skippedWeeks ?? defaultConfiguration.skippedWeeks
  };

  return configuration;
};
