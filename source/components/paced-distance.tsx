import React from 'react';
import { paceSymbol } from '../constants';
import { extractPaceMinutes, extractPaceSeconds, getDisplayDistance } from '../logic';
import { Distance, Pace } from '../types';

export interface PacedDistanceProps {
  distance: Distance;
  pace: Pace;
  symbol: string;
}

export const PacedDistance: React.FC<PacedDistanceProps> = (props) => {
  return (
    <div>
      {props.symbol} {getDisplayDistance(props.distance)} {paceSymbol}{' '}
      {extractPaceMinutes(props.pace)}' {extractPaceSeconds(props.pace)}"
    </div>
  );
};
