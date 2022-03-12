import { BasePlan } from '../types';
import { TrainingType } from './training-type';

export const basePlan: BasePlan = [
  {
    number: 1,
    trainings: [
      {
        type: TrainingType.rest
      },
      {
        type: TrainingType.rest
      },
      {
        type: TrainingType.rest
      },
      {
        type: TrainingType.moderate,
        distance: 3
      },
      {
        type: TrainingType.rest
      },
      {
        type: TrainingType.moderate,
        distance: 3
      },
      {
        type: TrainingType.moderate,
        distance: 4
      }
    ]
  },
  {
    number: 2,
    trainings: [
      {
        type: TrainingType.rest
      },
      {
        type: TrainingType.moderate,
        distance: 2
      },
      {
        type: TrainingType.rest
      },
      {
        type: TrainingType.moderate,
        distance: 3
      },
      {
        type: TrainingType.moderate,
        distance: 3
      },
      {
        type: TrainingType.moderate,
        distance: 3
      },
      {
        type: TrainingType.moderate,
        distance: 4
      }
    ]
  },
  {
    number: 3,
    trainings: [
      {
        type: TrainingType.rest
      },
      {
        type: TrainingType.moderate,
        distance: 4
      },
      {
        type: TrainingType.rest
      },
      {
        type: TrainingType.moderate,
        distance: 4
      },
      {
        type: TrainingType.moderate,
        distance: 4
      },
      {
        type: TrainingType.moderate,
        distance: 4
      },
      {
        type: TrainingType.moderate,
        distance: 5
      }
    ]
  },
  {
    number: 4,
    trainings: [
      {
        type: TrainingType.rest
      },
      {
        type: TrainingType.moderate,
        distance: 5
      },
      {
        type: TrainingType.rest
      },
      {
        type: TrainingType.moderate,
        distance: 3
      },
      {
        type: TrainingType.moderate,
        distance: 3
      },
      {
        type: TrainingType.moderate,
        distance: 5
      },
      {
        type: TrainingType.moderate,
        distance: 5
      }
    ]
  },
  {
    number: 5,
    trainings: [
      {
        type: TrainingType.rest
      },
      {
        type: TrainingType.moderate,
        distance: 5
      },
      {
        type: TrainingType.rest
      },
      {
        type: TrainingType.moderate,
        distance: 4
      },
      {
        type: TrainingType.moderate,
        distance: 5
      },
      {
        type: TrainingType.moderate,
        distance: 4
      },
      {
        type: TrainingType.moderate,
        distance: 6
      }
    ]
  },
  {
    number: 6,
    trainings: [
      {
        type: TrainingType.recovery,
        distance: 4
      },
      {
        type: TrainingType.speed,
        intervals: {
          intervalDistance: 0.25,
          intervalsNumber: 12,
          recoveryDistance: 0.25
        }
      },
      {
        type: TrainingType.rest
      },
      {
        type: TrainingType.timed,
        distance: 5
      },
      {
        type: TrainingType.recovery,
        distance: 4
      },
      {
        type: TrainingType.moderate,
        distance: 8
      },
      {
        type: TrainingType.moderate,
        distance: 8
      }
    ]
  },
  {
    number: 7,
    trainings: [
      {
        type: TrainingType.recovery,
        distance: 4
      },
      {
        type: TrainingType.speed,
        intervals: {
          intervalDistance: 0.4,
          intervalsNumber: 8,
          recoveryDistance: 0.25
        }
      },
      {
        type: TrainingType.rest
      },
      {
        type: TrainingType.timed,
        distance: 5
      },
      {
        type: TrainingType.recovery,
        distance: 4
      },
      {
        type: TrainingType.moderate,
        distance: 6
      },
      {
        type: TrainingType.moderate,
        distance: 10
      }
    ]
  },
  {
    number: 8,
    trainings: [
      {
        type: TrainingType.recovery,
        distance: 6
      },
      {
        type: TrainingType.speed,
        intervals: {
          intervalDistance: 0.5,
          intervalsNumber: 6,
          recoveryDistance: 0.25
        }
      },
      {
        type: TrainingType.rest
      },
      {
        type: TrainingType.timed,
        distance: 5
      },
      {
        type: TrainingType.recovery,
        distance: 5
      },
      {
        type: TrainingType.moderate,
        distance: 6
      },
      {
        type: TrainingType.moderate,
        distance: 10
      }
    ]
  },
  {
    number: 9,
    trainings: [
      {
        type: TrainingType.recovery,
        distance: 5
      },
      {
        type: TrainingType.speed,
        intervals: {
          intervalDistance: 0.6,
          intervalsNumber: 5,
          recoveryDistance: 0.25
        }
      },
      {
        type: TrainingType.rest
      },
      {
        type: TrainingType.timed,
        distance: 8
      },
      {
        type: TrainingType.recovery,
        distance: 6
      },
      {
        type: TrainingType.moderate,
        distance: 5
      },
      {
        type: TrainingType.moderate,
        distance: 15
      }
    ]
  },
  {
    number: 10,
    trainings: [
      {
        type: TrainingType.recovery,
        distance: 7
      },
      {
        type: TrainingType.speed,
        intervals: {
          intervalDistance: 0.75,
          intervalsNumber: 4,
          recoveryDistance: 0.25
        }
      },
      {
        type: TrainingType.rest
      },
      {
        type: TrainingType.timed,
        distance: 8
      },
      {
        type: TrainingType.recovery,
        distance: 5
      },
      {
        type: TrainingType.moderate,
        distance: 8
      },
      {
        type: TrainingType.moderate,
        distance: 10
      }
    ]
  },
  {
    number: 11,
    trainings: [
      {
        type: TrainingType.recovery,
        distance: 5
      },
      {
        type: TrainingType.strength,
        intervals: {
          intervalDistance: 1,
          intervalsNumber: 6,
          recoveryDistance: 0.25
        }
      },
      {
        type: TrainingType.rest
      },
      {
        type: TrainingType.timed,
        distance: 8
      },
      {
        type: TrainingType.recovery,
        distance: 5
      },
      {
        type: TrainingType.moderate,
        distance: 8
      },
      {
        type: TrainingType.moderate,
        distance: 16
      }
    ]
  },
  {
    number: 12,
    trainings: [
      {
        type: TrainingType.recovery,
        distance: 5
      },
      {
        type: TrainingType.strength,
        intervals: {
          intervalDistance: 1.5,
          intervalsNumber: 4,
          recoveryDistance: 0.5
        }
      },
      {
        type: TrainingType.rest
      },
      {
        type: TrainingType.timed,
        distance: 9
      },
      {
        type: TrainingType.recovery,
        distance: 5
      },
      {
        type: TrainingType.moderate,
        distance: 8
      },
      {
        type: TrainingType.moderate,
        distance: 10
      }
    ]
  },
  {
    number: 13,
    trainings: [
      {
        type: TrainingType.recovery,
        distance: 7
      },
      {
        type: TrainingType.strength,
        intervals: {
          intervalDistance: 2,
          intervalsNumber: 3,
          recoveryDistance: 0.5
        }
      },
      {
        type: TrainingType.rest
      },
      {
        type: TrainingType.timed,
        distance: 9
      },
      {
        type: TrainingType.recovery,
        distance: 6
      },
      {
        type: TrainingType.moderate,
        distance: 6
      },
      {
        type: TrainingType.moderate,
        distance: 16
      }
    ]
  },
  {
    number: 14,
    trainings: [
      {
        type: TrainingType.recovery,
        distance: 5
      },
      {
        type: TrainingType.strength,
        intervals: {
          intervalDistance: 3,
          intervalsNumber: 2,
          recoveryDistance: 1
        }
      },
      {
        type: TrainingType.rest
      },
      {
        type: TrainingType.timed,
        distance: 9
      },
      {
        type: TrainingType.recovery,
        distance: 5
      },
      {
        type: TrainingType.moderate,
        distance: 8
      },
      {
        type: TrainingType.moderate,
        distance: 10
      }
    ]
  },
  {
    number: 15,
    trainings: [
      {
        type: TrainingType.recovery,
        distance: 7
      },
      {
        type: TrainingType.strength,
        intervals: {
          intervalDistance: 2,
          intervalsNumber: 3,
          recoveryDistance: 0.5
        }
      },
      {
        type: TrainingType.rest
      },
      {
        type: TrainingType.timed,
        distance: 10
      },
      {
        type: TrainingType.recovery,
        distance: 6
      },
      {
        type: TrainingType.moderate,
        distance: 6
      },
      {
        type: TrainingType.moderate,
        distance: 16
      }
    ]
  },
  {
    number: 16,
    trainings: [
      {
        type: TrainingType.recovery,
        distance: 5
      },
      {
        type: TrainingType.strength,
        intervals: {
          intervalDistance: 1.5,
          intervalsNumber: 4,
          recoveryDistance: 0.25
        }
      },
      {
        type: TrainingType.rest
      },
      {
        type: TrainingType.timed,
        distance: 10
      },
      {
        type: TrainingType.recovery,
        distance: 5
      },
      {
        type: TrainingType.moderate,
        distance: 8
      },
      {
        type: TrainingType.moderate,
        distance: 10
      }
    ]
  },
  {
    number: 17,
    trainings: [
      {
        type: TrainingType.recovery,
        distance: 7
      },
      {
        type: TrainingType.strength,
        intervals: {
          intervalDistance: 1,
          intervalsNumber: 6,
          recoveryDistance: 0.25
        }
      },
      {
        type: TrainingType.rest
      },
      {
        type: TrainingType.timed,
        distance: 10
      },
      {
        type: TrainingType.recovery,
        distance: 6
      },
      {
        type: TrainingType.moderate,
        distance: 6
      },
      {
        type: TrainingType.moderate,
        distance: 8
      }
    ]
  },
  {
    number: 18,
    trainings: [
      {
        type: TrainingType.recovery,
        distance: 5
      },
      {
        type: TrainingType.moderate,
        distance: 5
      },
      {
        type: TrainingType.rest
      },
      {
        type: TrainingType.moderate,
        distance: 6
      },
      {
        type: TrainingType.moderate,
        distance: 5
      },
      {
        type: TrainingType.moderate,
        distance: 3
      },
      {
        type: TrainingType.race,
        distance: 26.2
      }
    ]
  }
];
