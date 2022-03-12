import React from 'react';
import { convertDistance } from '../logic/distance-units';
import { DistanceUnits } from '../types';

export interface DistanceProps {
  distance: number;
  distanceUnits: DistanceUnits;
  isDesktop: boolean;
}

export const getDisplayDistance = (
  distance: number,
  distanceUnits: DistanceUnits,
  isDesktop: boolean
) => convertDistance(distance, distanceUnits) + (isDesktop ? ` ${distanceUnits}` : '');

export const Distance: React.FC<DistanceProps> = (props) => {
  return <span>{getDisplayDistance(props.distance, props.distanceUnits, props.isDesktop)}</span>;
};
