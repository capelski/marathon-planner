import React from 'react';
import { recoveryIntervalSymbol, trainingCoreSymbol } from '../constants';
import { DistanceUnits } from '../models';
import { Intervals } from '../types';
import { Distance } from './distance';

export interface IntervalsDistanceProps {
  displayUnits: boolean;
  distanceUnits: DistanceUnits;
  intervals: Intervals;
}

export const IntervalsDistance: React.FC<IntervalsDistanceProps> = (props) => {
  return (
    <React.Fragment>
      <div style={{ marginLeft: 8 }}>
        {props.intervals.intervalsNumber}x(
        {trainingCoreSymbol}{' '}
        <Distance
          displayUnits={props.displayUnits}
          distance={props.intervals.intervalDistance}
          distanceUnits={props.distanceUnits}
        />
        {' - '}
        {recoveryIntervalSymbol}{' '}
        <Distance
          displayUnits={props.displayUnits}
          distance={props.intervals.recoveryDistance}
          distanceUnits={props.distanceUnits}
        />
        )
      </div>
    </React.Fragment>
  );
};
