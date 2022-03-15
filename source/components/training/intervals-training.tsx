import React from 'react';
import {
  coolDownSymbol,
  recoveryIntervalSymbol,
  trainingCoreSymbol,
  warmUpSymbol
} from '../../constants';
import { DetailedIntervalsTraining } from '../../types';
import { DistanceComponent } from '../distance';

export interface IntervalsTrainingProps {
  training: DetailedIntervalsTraining;
}

export const IntervalsTraining: React.FC<IntervalsTrainingProps> = (props) => {
  return (
    <div>
      <DistanceComponent distance={props.training.warmUpDistance} symbol={warmUpSymbol} />

      <div style={{ alignItems: 'center', display: 'flex' }}>
        <div>{props.training.intervals.intervalsNumber}x</div>
        <div style={{ borderLeft: '1px solid black', marginLeft: 8, paddingLeft: 8 }}>
          <DistanceComponent
            distance={props.training.intervals.intervalDistance}
            symbol={trainingCoreSymbol}
          />
          <DistanceComponent
            distance={props.training.intervals.recoveryDistance}
            symbol={recoveryIntervalSymbol}
          />
        </div>
      </div>

      <DistanceComponent distance={props.training.warmUpDistance} symbol={coolDownSymbol} />
    </div>
  );
};
