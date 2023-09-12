import { defaultConfiguration } from '../constants';
import { Configuration } from '../types';
import { isoStringToLocalDate } from './dates';

const configurationKey = 'settings';

type SerializedConfiguration = Omit<Configuration, 'startDate'> & { startDate?: string };

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
    completedTrainings:
      partialConfiguration.completedTrainings ?? defaultConfiguration.completedTrainings,
    expandedWeeks: partialConfiguration.expandedWeeks ?? defaultConfiguration.expandedWeeks,
    settings: {
      distanceUnits:
        partialConfiguration.settings?.distanceUnits ?? defaultConfiguration.settings.distanceUnits,
      racePace: partialConfiguration.settings?.racePace ?? defaultConfiguration.settings.racePace,
      skipRecovery:
        partialConfiguration.settings?.skipRecovery ?? defaultConfiguration.settings.skipRecovery,
      warmUpDistance:
        defaultConfiguration.settings.warmUpDistance ?? defaultConfiguration.settings.warmUpDistance
    },
    skippedWeeks: partialConfiguration.skippedWeeks ?? defaultConfiguration.skippedWeeks,
    startDate: isoStringToLocalDate(partialConfiguration.startDate)
  };

  return configuration;
};
