import { Dictionary, TrainingType } from '../types';

export const trainingTypeColors: Dictionary<string, TrainingType> = {
  [TrainingType.moderate]: '#4b944c',
  [TrainingType.race]: '#feff02',
  [TrainingType.recovery]: '#15546b',
  [TrainingType.rest]: 'lightgrey',
  [TrainingType.speed]: '#fd600e',
  [TrainingType.strength]: '#fea607',
  [TrainingType.timed]: '#a2d11c'
};

export const sortedTrainingTypes: TrainingType[] = [
  TrainingType.speed,
  TrainingType.strength,
  TrainingType.race,
  TrainingType.timed,
  TrainingType.moderate,
  TrainingType.recovery,
  TrainingType.rest
];
