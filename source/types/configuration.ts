import { CompletedTrainings } from './completed-trainings';
import { ExpandedWeeks } from './expanded-weeks';
import { Settings } from './settings';
import { SkippedWeeks } from './skipped-weeks';

export type Configuration = {
  completedTrainings: CompletedTrainings;
  expandedWeeks: ExpandedWeeks;
  settings: Settings;
  skippedWeeks: SkippedWeeks;
};
