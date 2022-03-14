import React from 'react';
import { recoveryIntervalSymbol, trainingCoreSymbol } from '../constants';
import { DetailedTrainingIntervals } from '../types';
import { PacedDistance } from './paced-distance';

export interface IntervalsDistanceProps {
  intervals: DetailedTrainingIntervals;
}

export const IntervalsDistance: React.FC<IntervalsDistanceProps> = (props) => {
  return (
    <div style={{ alignItems: 'center', display: 'flex' }}>
      <div>{props.intervals.intervalsNumber}x</div>
      <div style={{ borderLeft: '1px solid black', marginLeft: 8, paddingLeft: 8 }}>
        <PacedDistance
          distance={props.intervals.intervalDistance}
          pace={props.intervals.intervalPace}
          symbol={trainingCoreSymbol}
        />
        <PacedDistance
          distance={props.intervals.recoveryDistance}
          pace={props.intervals.recoveryPace}
          symbol={recoveryIntervalSymbol}
        />
      </div>
    </div>
  );
};
