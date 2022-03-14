import {
  milesToKm,
  moderatePaceVariation,
  recoveryPaceVariation,
  speedPaceVariation,
  strengthPaceVariation
} from '../constants';
import { DistanceUnits } from '../models';
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

export const extractPaceMinutes = (pace: Pace) => {
  return Math.floor(pace.seconds / 60);
};

export const extractPaceSeconds = (pace: Pace) => {
  return pace.seconds % 60;
};

export const getPace = (distanceUnits: DistanceUnits, minutes: number, seconds: number): Pace => {
  return {
    distanceUnits,
    seconds: minutes * 60 + seconds
  };
};

export const getTrainingPaces = (racePace: Pace): TrainingPaces => {
  return {
    moderate: mergePaces(racePace, convertPace(moderatePaceVariation, racePace.distanceUnits)),
    race: racePace,
    recovery: mergePaces(racePace, convertPace(recoveryPaceVariation, racePace.distanceUnits)),
    speed: mergePaces(racePace, convertPace(speedPaceVariation, racePace.distanceUnits)),
    strength: mergePaces(racePace, convertPace(strengthPaceVariation, racePace.distanceUnits)),
    timed: racePace
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