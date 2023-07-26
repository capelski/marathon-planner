import React from 'react';
import { coolDownSymbol, trainingCoreSymbol, warmUpSymbol } from '../../constants';
import { DetailedWarmedUpTraining } from '../../types';
import { DistanceComponent } from '../distance';
import { TrainingTotals } from './training-totals';

export interface WarmedUpTrainingProps {
  training: DetailedWarmedUpTraining;
}

export const WarmedUpTraining: React.FC<WarmedUpTrainingProps> = (props) => {
  return (
    <React.Fragment>
      <ul style={{ marginBottom: 0, marginTop: 0, paddingInlineStart: 16 }}>
        <li>
          <DistanceComponent distance={props.training.warmUpDistance} symbol={warmUpSymbol} />
        </li>
        <li>
          <DistanceComponent distance={props.training.distance} symbol={trainingCoreSymbol} />
        </li>
        <li>
          <DistanceComponent distance={props.training.warmUpDistance} symbol={coolDownSymbol} />
        </li>
      </ul>

      <TrainingTotals
        distance={props.training.totalDistance}
        seconds={props.training.totalSeconds}
      />
    </React.Fragment>
  );
};
