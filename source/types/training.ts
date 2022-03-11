import { TrainingType } from './training-type';

export type Training =
  | {
      type: TrainingType.moderate | TrainingType.race | TrainingType.recovery | TrainingType.timed;
      distance: number;
    }
  | {
      type: TrainingType.rest;
    }
  | {
      type: TrainingType.speed | TrainingType.strength;
      intervalDistance: number;
      intervalRecovery: number;
      intervalsNumber: number;
    };
