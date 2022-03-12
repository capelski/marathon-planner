import React from 'react';
import { convertDistance } from '../logic';
import { DistanceUnits } from '../models';

export interface DistanceProps {
  displayUnits: boolean;
  distance: number;
  distanceUnits: DistanceUnits;
}

export const getDisplayDistance = (
  distance: number,
  distanceUnits: DistanceUnits,
  displayUnits: boolean
) => convertDistance(distance, distanceUnits) + (displayUnits ? ` ${distanceUnits}` : '');

export const Distance: React.FC<DistanceProps> = (props) => {
  return <span>{getDisplayDistance(props.distance, props.distanceUnits, props.displayUnits)}</span>;
};