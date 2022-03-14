import React from 'react';
import { recoveryIntervalSymbol, trainingCoreSymbol } from '../constants';
import { DetailedTrainingIntervals } from '../types';
import { PacedDistanceComponent } from './paced-distance';

export interface IntervalsDistanceProps {
  intervals: DetailedTrainingIntervals;
}

export const IntervalsDistance: React.FC<IntervalsDistanceProps> = (props) => {
  return (
    <div style={{ alignItems: 'center', display: 'flex' }}>
      <div>{props.intervals.intervalsNumber}x</div>
      <div style={{ borderLeft: '1px solid black', marginLeft: 8, paddingLeft: 8 }}>
        <PacedDistanceComponent
          distance={props.intervals.intervalDistance}
          symbol={trainingCoreSymbol}
        />
        <PacedDistanceComponent
          distance={props.intervals.recoveryDistance}
          symbol={recoveryIntervalSymbol}
        />
      </div>
    </div>
  );
};
