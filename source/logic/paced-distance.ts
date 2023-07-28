import { Distance, Pace, PacedDistance } from '../types';
import { convertDistance } from './distance';

export const getPacedDistance = (distance: Distance, pace: Pace): PacedDistance => {
  const convertedDistance = convertDistance(distance, pace.distanceUnits).value;

  return {
    distanceUnits: pace.distanceUnits,
    pace: pace.seconds,
    value: convertedDistance
  };
};

export const mergePacedDistances = (
  first: PacedDistance,
  ...rest: PacedDistance[]
): PacedDistance => {
  const convertedRest = rest.map((distance) => convertDistance(distance, first.distanceUnits));
  const totalDistance = convertedRest.reduce(
    (total, distance) => total + distance.value,
    first.value
  );
  const averagePace = [first, ...convertedRest].reduce(
    (total, distance) => total + Math.floor((distance.pace * distance.value) / totalDistance),
    0
  );

  return {
    distanceUnits: first.distanceUnits,
    pace: averagePace,
    value: totalDistance
  };
};

export const multiplyPacedDistance = (distance: PacedDistance, times: number): PacedDistance => {
  return {
    ...distance,
    value: distance.value * times
  };
};
