import React from 'react';
import { trainingCoreSymbol } from '../constants';
import { DistanceUnits } from '../models';
import { Distance } from './distance';

export interface RegularDistanceProps {
  displayUnits: boolean;
  distance: number;
  distanceUnits: DistanceUnits;
}

export const RegularDistance: React.FC<RegularDistanceProps> = (props) => {
  return (
    <div style={{ marginLeft: 8 }}>
      {trainingCoreSymbol}{' '}
      <Distance
        displayUnits={props.displayUnits}
        distance={props.distance}
        distanceUnits={props.distanceUnits}
      />
    </div>
  );
};
