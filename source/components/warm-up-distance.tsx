import React from 'react';
import { DistanceUnits } from '../models';
import { Distance } from './distance';

export interface WarmUpDistanceProps {
  displayUnits: boolean;
  distance: number;
  distanceUnits: DistanceUnits;
  symbol: string;
}

export const WarmUpDistance: React.FC<WarmUpDistanceProps> = (props) => {
  return (
    <div style={{ marginLeft: 8 }}>
      {props.symbol}{' '}
      <Distance
        displayUnits={props.displayUnits}
        distance={props.distance}
        distanceUnits={props.distanceUnits}
      />
    </div>
  );
};
