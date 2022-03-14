import React from 'react';
import { paceSymbol } from '../constants';
import { extractPaceMinutes, extractPaceSeconds, getDisplayDistance } from '../logic';
import { Distance, PacedDistance } from '../types';

export interface DistanceProps {
  distance: Distance | PacedDistance;
  symbol: string;
}

export const DistanceComponent: React.FC<DistanceProps> = (props) => {
  return (
    <div>
      {props.symbol} {getDisplayDistance(props.distance)}
      {'pace' in props.distance ? (
        <React.Fragment>
          {' '}
          {paceSymbol} {extractPaceMinutes(props.distance.pace)}'{' '}
          {extractPaceSeconds(props.distance.pace)}"
        </React.Fragment>
      ) : undefined}
    </div>
  );
};
