import React from 'react';
import {
  coolDownSymbol,
  recoveryIntervalSymbol,
  trainingCoreSymbol,
  warmUpSymbol
} from '../../constants';
import { DetailedIntervalsTraining } from '../../types';
import { DistanceComponent } from '../distance';
import { TrainingTotals } from './training-totals';

export interface IntervalsTrainingProps {
  training: DetailedIntervalsTraining;
}

export const IntervalsTraining: React.FC<IntervalsTrainingProps> = (props) => {
  return (
    <React.Fragment>
      <React.Fragment>
        <ul style={{ marginBottom: 0, marginTop: 0, paddingInlineStart: 16 }}>
          <li>
            <DistanceComponent distance={props.training.warmUpDistance} symbol={warmUpSymbol} />
          </li>

          <li>
            <div style={{ display: 'flex' }}>
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
    </React.Fragment>
  );
};
