import { Dictionary } from '../types';

export enum TrainingType {
  easy = 'easy training',
  marathon = 'marathon',
  moderate = 'moderate training',
  recovery = 'recovery training',
  rest = 'rest',
  simulator = 'simulator',
  speed = 'speed training',
  strength = 'strength training',
  timed = 'timed training'
}

export const sortedTrainingTypes: TrainingType[] = [
  TrainingType.speed,
  TrainingType.strength,
  TrainingType.marathon,
  TrainingType.simulator,
  TrainingType.timed,
  TrainingType.moderate,
  TrainingType.easy,
  TrainingType.recovery,
  TrainingType.rest
];

export const trainingTypeColors: Dictionary<
  { backgroundColor: string; textColor: string },
  TrainingType
> = {
  [TrainingType.easy]: {
    backgroundColor: '#15546b',
    textColor: 'white'
  },
  [TrainingType.marathon]: {
    backgroundColor: '#fea607',
    textColor: 'white'
  },
  [TrainingType.moderate]: {
    backgroundColor: '#4b944c',
    textColor: 'white'
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
    backgroundColor: '#dc3545',
    textColor: 'white'
  },
  [TrainingType.simulator]: {
    backgroundColor: '#feff02',
    textColor: 'black'
  },
  [TrainingType.strength]: {
    backgroundColor: '#fd600e',
    textColor: 'white'
  },
  [TrainingType.timed]: {
    backgroundColor: '#a2d11c',
    textColor: 'white'
  }
};
