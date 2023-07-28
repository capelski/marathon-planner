import { milesToKm } from '../constants';
import { DistanceUnits } from '../models';
import { Dictionary, Distance } from '../types';

const distanceConversions: Dictionary<
  Dictionary<<T extends Distance>(distance: T) => T, DistanceUnits>,
  DistanceUnits
> = {
  [DistanceUnits.kilometers]: {
    [DistanceUnits.kilometers]: (distance) => distance,
    [DistanceUnits.miles]: (distance) => ({
      ...distance,
      distanceUnits: DistanceUnits.miles,
      value: Math.ceil(distance.value / (milesToKm * 10)) / 10
    })
  },
  [DistanceUnits.miles]: {
    [DistanceUnits.kilometers]: (distance) => ({
      ...distance,
      distanceUnits: DistanceUnits.kilometers,
      value: Math.floor(distance.value * milesToKm * 10) / 10
    }),
    [DistanceUnits.miles]: (distance) => distance
  }
};

export const convertDistance = <T extends Distance>(distance: T, distanceUnits: DistanceUnits) =>
  distanceConversions[distance.distanceUnits][distanceUnits](distance);

export const createDistance = (value: number, distanceUnits: DistanceUnits): Distance => {
  return { distanceUnits, value };
};

export const getDisplayDistance = (distance: Distance) => {
  return `${Math.floor(distance.value * 10) / 10} ${distance.distanceUnits}`;
};

export const mergeDistances = (first: Distance, ...rest: Distance[]): Distance => {
  const convertedRest = rest.map((distance) => convertDistance(distance, first.distanceUnits));
  const totalDistance = convertedRest.reduce(
    (total, distance) => total + distance.value,
    first.value
  );

  return {
    distanceUnits: first.distanceUnits,
    value: totalDistance
  };
};
