import React from 'react';
import { recoveryIntervalSymbol, trainingCoreSymbol } from '../../constants';
import { DetailedIntervalsTraining } from '../../types';
import { PacedDistanceComponent } from '../paced-distance';
import { WarmedUpTrainingComponent } from './warmed-up-training';

export interface IntervalsTrainingProps {
  training: DetailedIntervalsTraining;
}

export const IntervalsTraining: React.FC<IntervalsTrainingProps> = (props) => {
  return (
    <WarmedUpTrainingComponent warmUpDistance={props.training.warmUpDistance}>
      <div style={{ alignItems: 'center', display: 'flex' }}>
        <div>{props.training.intervals.intervalsNumber}x</div>
        <div style={{ borderLeft: '1px solid black', marginLeft: 8, paddingLeft: 8 }}>
          <PacedDistanceComponent
            distance={props.training.intervals.intervalDistance}
            symbol={trainingCoreSymbol}
          />
          <PacedDistanceComponent
            distance={props.training.intervals.recoveryDistance}
            symbol={recoveryIntervalSymbol}
          />
        </div>
      </div>
    </WarmedUpTrainingComponent>
  );
};
