import { Plan } from '../types';
import { DistanceUnits } from './distance-units';
import { TrainingType } from './training-type';

export const basePlan: Plan = [
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
        type: TrainingType.easy,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 3
        }
      },
      {
        type: TrainingType.rest
      },
      {
        type: TrainingType.easy,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 3
        }
      },
      {
        type: TrainingType.moderate,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 4
        }
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
        type: TrainingType.easy,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 2
        }
      },
      {
        type: TrainingType.rest
      },
      {
        type: TrainingType.easy,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 3
        }
      },
      {
        type: TrainingType.easy,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 3
        }
      },
      {
        type: TrainingType.easy,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 3
        }
      },
      {
        type: TrainingType.moderate,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 4
        }
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
        type: TrainingType.easy,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 4
        }
      },
      {
        type: TrainingType.rest
      },
      {
        type: TrainingType.easy,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 4
        }
      },
      {
        type: TrainingType.easy,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 4
        }
      },
      {
        type: TrainingType.easy,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 4
        }
      },
      {
        type: TrainingType.moderate,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 5
        }
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
        type: TrainingType.easy,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 5
        }
      },
      {
        type: TrainingType.rest
      },
      {
        type: TrainingType.easy,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 3
        }
      },
      {
        type: TrainingType.easy,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 3
        }
      },
      {
        type: TrainingType.easy,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 5
        }
      },
      {
        type: TrainingType.moderate,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 5
        }
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
        type: TrainingType.easy,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 5
        }
      },
      {
        type: TrainingType.rest
      },
      {
        type: TrainingType.easy,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 4
        }
      },
      {
        type: TrainingType.easy,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 5
        }
      },
      {
        type: TrainingType.easy,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 4
        }
      },
      {
        type: TrainingType.moderate,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 6
        }
      }
    ]
  },
  {
    number: 6,
    trainings: [
      {
        type: TrainingType.recovery,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 4
        }
      },
      {
        type: TrainingType.speed,
        intervals: {
          intervalDistance: {
            distanceUnits: DistanceUnits.miles,
            value: 0.25
          },
          intervalsNumber: 12,
          recoveryDistance: {
            distanceUnits: DistanceUnits.miles,
            value: 0.25
          }
        }
      },
      {
        type: TrainingType.rest
      },
      {
        type: TrainingType.timed,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 5
        }
      },
      {
        type: TrainingType.recovery,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 4
        }
      },
      {
        type: TrainingType.easy,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 8
        }
      },
      {
        type: TrainingType.moderate,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 8
        }
      }
    ]
  },
  {
    number: 7,
    trainings: [
      {
        type: TrainingType.recovery,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 4
        }
      },
      {
        type: TrainingType.speed,
        intervals: {
          intervalDistance: {
            distanceUnits: DistanceUnits.miles,
            value: 0.4
          },
          intervalsNumber: 8,
          recoveryDistance: {
            distanceUnits: DistanceUnits.miles,
            value: 0.25
          }
        }
      },
      {
        type: TrainingType.rest
      },
      {
        type: TrainingType.timed,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 5
        }
      },
      {
        type: TrainingType.recovery,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 4
        }
      },
      {
        type: TrainingType.easy,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 6
        }
      },
      {
        type: TrainingType.moderate,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 10
        }
      }
    ]
  },
  {
    number: 8,
    trainings: [
      {
        type: TrainingType.recovery,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 6
        }
      },
      {
        type: TrainingType.speed,
        intervals: {
          intervalDistance: {
            distanceUnits: DistanceUnits.miles,
            value: 0.5
          },
          intervalsNumber: 6,
          recoveryDistance: {
            distanceUnits: DistanceUnits.miles,
            value: 0.25
          }
        }
      },
      {
        type: TrainingType.rest
      },
      {
        type: TrainingType.timed,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 5
        }
      },
      {
        type: TrainingType.recovery,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 5
        }
      },
      {
        type: TrainingType.easy,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 6
        }
      },
      {
        type: TrainingType.moderate,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 10
        }
      }
    ]
  },
  {
    number: 9,
    trainings: [
      {
        type: TrainingType.recovery,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 5
        }
      },
      {
        type: TrainingType.speed,
        intervals: {
          intervalDistance: {
            distanceUnits: DistanceUnits.miles,
            value: 0.6
          },
          intervalsNumber: 5,
          recoveryDistance: {
            distanceUnits: DistanceUnits.miles,
            value: 0.25
          }
        }
      },
      {
        type: TrainingType.rest
      },
      {
        type: TrainingType.timed,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 8
        }
      },
      {
        type: TrainingType.recovery,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 6
        }
      },
      {
        type: TrainingType.easy,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 5
        }
      },
      {
        type: TrainingType.moderate,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 15
        }
      }
    ]
  },
  {
    number: 10,
    trainings: [
      {
        type: TrainingType.recovery,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 7
        }
      },
      {
        type: TrainingType.speed,
        intervals: {
          intervalDistance: {
            distanceUnits: DistanceUnits.miles,
            value: 0.75
          },
          intervalsNumber: 4,
          recoveryDistance: {
            distanceUnits: DistanceUnits.miles,
            value: 0.25
          }
        }
      },
      {
        type: TrainingType.rest
      },
      {
        type: TrainingType.timed,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 8
        }
      },
      {
        type: TrainingType.recovery,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 5
        }
      },
      {
        type: TrainingType.easy,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 8
        }
      },
      {
        type: TrainingType.moderate,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 10
        }
      }
    ]
  },
  {
    number: 11,
    trainings: [
      {
        type: TrainingType.recovery,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 5
        }
      },
      {
        type: TrainingType.strength,
        intervals: {
          intervalDistance: {
            distanceUnits: DistanceUnits.miles,
            value: 1
          },
          intervalsNumber: 6,
          recoveryDistance: {
            distanceUnits: DistanceUnits.miles,
            value: 0.25
          }
        }
      },
      {
        type: TrainingType.rest
      },
      {
        type: TrainingType.timed,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 8
        }
      },
      {
        type: TrainingType.recovery,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 5
        }
      },
      {
        type: TrainingType.easy,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 8
        }
      },
      {
        type: TrainingType.moderate,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 16
        }
      }
    ]
  },
  {
    number: 12,
    trainings: [
      {
        type: TrainingType.recovery,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 5
        }
      },
      {
        type: TrainingType.strength,
        intervals: {
          intervalDistance: {
            distanceUnits: DistanceUnits.miles,
            value: 1.5
          },
          intervalsNumber: 4,
          recoveryDistance: {
            distanceUnits: DistanceUnits.miles,
            value: 0.5
          }
        }
      },
      {
        type: TrainingType.rest
      },
      {
        type: TrainingType.timed,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 9
        }
      },
      {
        type: TrainingType.recovery,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 5
        }
      },
      {
        type: TrainingType.easy,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 8
        }
      },
      {
        type: TrainingType.moderate,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 10
        }
      }
    ]
  },
  {
    number: 13,
    trainings: [
      {
        type: TrainingType.recovery,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 7
        }
      },
      {
        type: TrainingType.strength,
        intervals: {
          intervalDistance: {
            distanceUnits: DistanceUnits.miles,
            value: 2
          },
          intervalsNumber: 3,
          recoveryDistance: {
            distanceUnits: DistanceUnits.miles,
            value: 0.5
          }
        }
      },
      {
        type: TrainingType.rest
      },
      {
        type: TrainingType.timed,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 9
        }
      },
      {
        type: TrainingType.recovery,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 6
        }
      },
      {
        type: TrainingType.easy,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 6
        }
      },
      {
        type: TrainingType.moderate,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 16
        }
      }
    ]
  },
  {
    number: 14,
    trainings: [
      {
        type: TrainingType.recovery,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 5
        }
      },
      {
        type: TrainingType.strength,
        intervals: {
          intervalDistance: {
            distanceUnits: DistanceUnits.miles,
            value: 3
          },
          intervalsNumber: 2,
          recoveryDistance: { distanceUnits: DistanceUnits.miles, value: 1 }
        }
      },
      {
        type: TrainingType.rest
      },
      {
        type: TrainingType.timed,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 9
        }
      },
      {
        type: TrainingType.recovery,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 5
        }
      },
      {
        type: TrainingType.easy,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 8
        }
      },
      {
        type: TrainingType.moderate,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 10
        }
      }
    ]
  },
  {
    number: 15,
    trainings: [
      {
        type: TrainingType.recovery,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 7
        }
      },
      {
        type: TrainingType.strength,
        intervals: {
          intervalDistance: {
            distanceUnits: DistanceUnits.miles,
            value: 2
          },
          intervalsNumber: 3,
          recoveryDistance: {
            distanceUnits: DistanceUnits.miles,
            value: 0.5
          }
        }
      },
      {
        type: TrainingType.rest
      },
      {
        type: TrainingType.moderate,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 9.7
        }
      },
      {
        type: TrainingType.recovery,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 6
        }
      },
      {
        type: TrainingType.easy,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 6
        }
      },
      {
        type: TrainingType.simulator,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 16.3
        }
      }
    ]
  },
  {
    number: 16,
    trainings: [
      {
        type: TrainingType.recovery,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 5
        }
      },
      {
        type: TrainingType.strength,
        intervals: {
          intervalDistance: {
            distanceUnits: DistanceUnits.miles,
            value: 1.5
          },
          intervalsNumber: 4,
          recoveryDistance: {
            distanceUnits: DistanceUnits.miles,
            value: 0.25
          }
        }
      },
      {
        type: TrainingType.rest
      },
      {
        type: TrainingType.timed,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 10
        }
      },
      {
        type: TrainingType.recovery,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 5
        }
      },
      {
        type: TrainingType.easy,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 8
        }
      },
      {
        type: TrainingType.moderate,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 10
        }
      }
    ]
  },
  {
    number: 17,
    trainings: [
      {
        type: TrainingType.recovery,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 7
        }
      },
      {
        type: TrainingType.strength,
        intervals: {
          intervalDistance: {
            distanceUnits: DistanceUnits.miles,
            value: 1
          },
          intervalsNumber: 6,
          recoveryDistance: {
            distanceUnits: DistanceUnits.miles,
            value: 0.25
          }
        }
      },
      {
        type: TrainingType.rest
      },
      {
        type: TrainingType.timed,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 10
        }
      },
      {
        type: TrainingType.recovery,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 6
        }
      },
      {
        type: TrainingType.easy,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 6
        }
      },
      {
        type: TrainingType.moderate,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 8
        }
      }
    ]
  },
  {
    number: 18,
    trainings: [
      {
        type: TrainingType.recovery,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 5
        }
      },
      {
        type: TrainingType.easy,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 5
        }
      },
      {
        type: TrainingType.rest
      },
      {
        type: TrainingType.easy,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 6
        }
      },
      {
        type: TrainingType.easy,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 5
        }
      },
      {
        type: TrainingType.easy,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 3
        }
      },
      {
        type: TrainingType.marathon,
        distance: {
          distanceUnits: DistanceUnits.miles,
          value: 26.2
        }
      }
    ]
  }
];
