import { Dictionary } from '../types';

export enum TrainingType {
  longRun = 'long run',
  moderate = 'moderate training',
  race = 'race',
  recovery = 'recovery training',
  rest = 'rest',
  speed = 'speed training',
  strength = 'strength training',
  timed = 'timed training'
}

export const sortedTrainingTypes: TrainingType[] = [
  TrainingType.speed,
  TrainingType.strength,
  TrainingType.race,
  TrainingType.timed,
  TrainingType.longRun,
  TrainingType.moderate,
  TrainingType.recovery,
  TrainingType.rest
];

export const trainingTypeColors: Dictionary<
  { backgroundColor: string; textColor: string },
  TrainingType
> = {
  [TrainingType.longRun]: {
    backgroundColor: '#4b944c',
    textColor: 'white'
  },
  [TrainingType.moderate]: {
    backgroundColor: '#15546b',
    textColor: 'white'
  },
  [TrainingType.race]: {
    backgroundColor: '#feff02',
    textColor: 'black'
  },
  [TrainingType.recovery]: {
    backgroundColor: '#830040',
    textColor: 'white'
  },
  [TrainingType.rest]: {
    backgroundColor: 'lightgrey',
    textColor: 'black'
  },
  [TrainingType.speed]: {
    backgroundColor: '#fd600e',
    textColor: 'white'
  },
  [TrainingType.strength]: {
    backgroundColor: '#fea607',
    textColor: 'white'
  },
  [TrainingType.timed]: {
    backgroundColor: '#a2d11c',
    textColor: 'white'
  }
};
