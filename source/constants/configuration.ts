import { Configuration } from '../types';
import { defaultSettings } from './settings';

export const defaultConfiguration: Configuration = {
  collapsedWeeks: {},
  completedTrainings: {},
  settings: defaultSettings,
  skippedWeeks: {}
};
