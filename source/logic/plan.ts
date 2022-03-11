import { TrainingType, Week } from '../types';

export const plan: Week[] = [
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
        intervalDistance: 0.25,
        intervalRecovery: 0.25,
        intervalsNumber: 12
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
        intervalDistance: 0.4,
        intervalRecovery: 0.25,
        intervalsNumber: 8
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
        intervalDistance: 0.5,
        intervalRecovery: 0.25,
        intervalsNumber: 6
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
        intervalDistance: 0.6,
        intervalRecovery: 0.25,
        intervalsNumber: 5
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
        intervalDistance: 0.75,
        intervalRecovery: 0.25,
        intervalsNumber: 4
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
        intervalDistance: 1,
        intervalRecovery: 0.25,
        intervalsNumber: 6
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
        intervalDistance: 1.5,
        intervalRecovery: 0.5,
        intervalsNumber: 4
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
        intervalDistance: 2,
        intervalRecovery: 0.5,
        intervalsNumber: 3
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
        intervalDistance: 3,
        intervalRecovery: 1,
        intervalsNumber: 2
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
        intervalDistance: 2,
        intervalRecovery: 0.5,
        intervalsNumber: 3
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
        intervalDistance: 1.5,
        intervalRecovery: 0.25,
        intervalsNumber: 4
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
        intervalDistance: 1,
        intervalRecovery: 0.25,
        intervalsNumber: 6
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
