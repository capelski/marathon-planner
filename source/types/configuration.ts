import { CollapsedWeeks } from './collapsed-weeks';
import { CompletedTrainings } from './completed-trainings';
import { Settings } from './settings';
import { SkippedWeeks } from './skipped-weeks';

export type Configuration = {
  collapsedWeeks: CollapsedWeeks;
  completedTrainings: CompletedTrainings;
  settings: Settings;
  skippedWeeks: SkippedWeeks;
};
