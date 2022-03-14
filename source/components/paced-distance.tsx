import React from 'react';
import { paceSymbol } from '../constants';
import { extractPaceMinutes, extractPaceSeconds, getDisplayDistance } from '../logic';
import { PacedDistance } from '../types';

export interface PacedDistanceProps {
  distance: PacedDistance;
  symbol: string;
}

export const PacedDistanceComponent: React.FC<PacedDistanceProps> = (props) => {
  return (
    <div>
      {props.symbol} {getDisplayDistance(props.distance)} {paceSymbol}{' '}
      {extractPaceMinutes(props.distance.pace)}' {extractPaceSeconds(props.distance.pace)}"
    </div>
  );
};
