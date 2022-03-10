export enum DistanceUnits {
  km = 'km',
  miles = 'miles'
}

export type Training =
  | {
      type: TrainingType.comfortable | TrainingType.recovery | TrainingType.timed;
      distance: number;
    }
  | {
      type: TrainingType.race | TrainingType.rest;
    }
  | {
      type: TrainingType.speed | TrainingType.strength;
      intervalDistance: number;
      intervalRecovery: number;
      intervalsNumber: number;
    };

export enum TrainingType {
  comfortable = 'comfortable',
  recovery = 'recovery',
  race = 'race',
  rest = 'rest',
  speed = 'speed',
  strength = 'strength',
  timed = 'timed'
}

export type Week = {
  number: number;
  trainings: Training[];
};
