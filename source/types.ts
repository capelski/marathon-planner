export enum DistanceUnits {
  kilometers = 'km',
  miles = 'mi'
}

export type Training =
  | {
      type:
        | TrainingType.comfortable
        | TrainingType.race
        | TrainingType.recovery
        | TrainingType.timed;
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

// The existing TrainingType members order is needed for the legend to be displayed properly
export enum TrainingType {
  speed = 'speed',
  strength = 'strength',
  timed = 'timed',
  race = 'race',
  comfortable = 'comfortable',
  recovery = 'recovery',
  rest = 'rest'
}

export type Week = {
  number: number;
  trainings: Training[];
};
