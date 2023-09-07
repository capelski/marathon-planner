import { Configuration } from '../types';
import { defaultSettings } from './settings';

export const defaultConfiguration: Configuration = {
  completedTrainings: {},
  expandedWeeks: { 1: true },
  settings: defaultSettings,
  skippedWeeks: {}
};
