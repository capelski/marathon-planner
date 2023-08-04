import {
  easyPaceVariation,
  milesToKm,
  moderatePaceVariation,
  recoveryPaceVariation,
  speedPaceVariation,
  strengthPaceVariation
} from '../constants';
import { DistanceUnits, TrainingType } from '../models';
import { Dictionary, Pace, TrainingPaces } from '../types';

const paceConversions: Dictionary<
  Dictionary<(pace: Pace) => Pace, DistanceUnits>,
  DistanceUnits
> = {
  [DistanceUnits.kilometers]: {
    [DistanceUnits.kilometers]: (pace) => pace,
    [DistanceUnits.miles]: (pace) => ({
      distanceUnits: DistanceUnits.miles,
      seconds: Math.floor(pace.seconds * milesToKm)
    })
  },
  [DistanceUnits.miles]: {
    [DistanceUnits.kilometers]: (pace) => ({
      distanceUnits: DistanceUnits.kilometers,
      seconds: Math.ceil(pace.seconds / milesToKm)
    }),
    [DistanceUnits.miles]: (pace) => pace
  }
};

export const convertPace = (pace: Pace, distanceUnits: DistanceUnits) => {
  return paceConversions[pace.distanceUnits][distanceUnits](pace);
};

export const extractPaceMinutes = (pace: number) => {
  return Math.floor(pace / 60);
};

export const extractPaceSeconds = (pace: number) => {
  return pace % 60;
};

export const getPace = (distanceUnits: DistanceUnits, minutes: number, seconds: number): Pace => {
  return {
    distanceUnits,
    seconds: minutes * 60 + seconds
  };
};

export const getTrainingPaces = (racePace: Pace): TrainingPaces => {
  return {
    [TrainingType.easy]: mergePaces(
      racePace,
      convertPace(easyPaceVariation, racePace.distanceUnits)
    ),
    [TrainingType.marathon]: racePace,
    [TrainingType.moderate]: mergePaces(
      racePace,
      convertPace(moderatePaceVariation, racePace.distanceUnits)
    ),
    [TrainingType.recovery]: mergePaces(
      racePace,
      convertPace(recoveryPaceVariation, racePace.distanceUnits)
    ),
    [TrainingType.rest]: {
      distanceUnits: racePace.distanceUnits,
      seconds: 0
    },
    [TrainingType.simulator]: racePace,
    [TrainingType.speed]: mergePaces(
      racePace,
      convertPace(speedPaceVariation, racePace.distanceUnits)
    ),
    [TrainingType.strength]: mergePaces(
      racePace,
      convertPace(strengthPaceVariation, racePace.distanceUnits)
    ),
    [TrainingType.timed]: racePace
  };
};

/** Sums all the paces' seconds into a new pace object. All paces must be in the same DistanceUnits */
export const mergePaces = (first: Pace, ...paces: Pace[]) => {
  return paces.reduce<Pace>((mergedPaces, nextPace) => {
    return {
      distanceUnits: mergedPaces.distanceUnits,
      seconds: mergedPaces.seconds + nextPace.seconds
    };
  }, first);
};
