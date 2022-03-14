import { milesToKm } from '../constants';
import { DistanceUnits } from '../models';
import { Dictionary, Distance } from '../types';

const distanceConversions: Dictionary<
  Dictionary<(distance: Distance) => Distance, DistanceUnits>,
  DistanceUnits
> = {
  [DistanceUnits.kilometers]: {
    [DistanceUnits.kilometers]: (distance) => distance,
    [DistanceUnits.miles]: (distance) => ({
      distanceUnits: DistanceUnits.miles,
      value: Math.ceil(distance.value / (milesToKm * 10)) / 10
    })
  },
  [DistanceUnits.miles]: {
    [DistanceUnits.kilometers]: (distance) => ({
      distanceUnits: DistanceUnits.kilometers,
      value: Math.floor(distance.value * milesToKm * 10) / 10
    }),
    [DistanceUnits.miles]: (distance) => distance
  }
};

export const convertDistance = (distance: Distance, distanceUnits: DistanceUnits) => {
  return distanceConversions[distance.distanceUnits][distanceUnits](distance);
};

export const createDistance = (value: number, distanceUnits: DistanceUnits): Distance => {
  return { distanceUnits, value };
};

export const getDisplayDistance = (distance: Distance) => {
  return `${distance.value} ${distance.distanceUnits}`;
};

/** Sums all the distances' value into a new distance object. All distances must be in the same DistanceUnits */
export const mergeDistances = (first: Distance, ...distances: Distance[]) => {
  return distances.reduce<Distance>((mergedDistances, nextDistance) => {
    return {
      distanceUnits: mergedDistances.distanceUnits,
      value: mergedDistances.value + nextDistance.value
    };
  }, first);
};

export const multiplyDistance = (distance: Distance, times: number): Distance => {
  return {
    distanceUnits: distance.distanceUnits,
    value: distance.value * times
  };
};
