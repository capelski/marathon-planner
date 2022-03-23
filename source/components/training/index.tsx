import React from 'react';
import { totalDistanceSymbol } from '../../constants';
import { TrainingCategory, trainingTypeColors } from '../../models';
import { DetailedTraining } from '../../types';
import { DistanceComponent } from '../distance';
import { Inliner } from '../inliner';
import { Time } from '../time';
import { DistanceTraining } from './distance-training';
import { IntervalsTraining } from './intervals-training';
import { TrainingCheckbox } from './training-checkbox';
import { WarmedUpTraining } from './warmed-up-training';

export interface TrainingProps {
  isDesktop: boolean;
  toggleTrainingCompleted: (trainingNumber: number) => void;
  training: DetailedTraining;
}

export const Training: React.FC<TrainingProps> = (props) => {
  const toggleCompleted = () => props.toggleTrainingCompleted(props.training.number);

  return (
    <div
      className="day"
      style={{
        display: 'flex',
        flexDirection: props.isDesktop ? 'column' : 'row',
        width: props.isDesktop ? '14.28%' : undefined
      }}
    >
      <div
        style={{
          alignSelf: 'stretch',
          backgroundColor: trainingTypeColors[props.training.type],
          height: props.isDesktop ? 16 : undefined,
          marginBottom: 4,
          width: props.isDesktop ? 'calc(100% - 4px)' : 20
        }}
      />
      <div
        style={{ marginBottom: 8, marginTop: 8, minHeight: '1em', paddingLeft: 4, paddingRight: 4 }}
      >
        {props.training.category === TrainingCategory.distance ? (
          <DistanceTraining toggleCompleted={toggleCompleted} training={props.training} />
        ) : undefined}

        {props.training.category === TrainingCategory.intervals ||
        props.training.category === TrainingCategory.warmedUp ? (
          <React.Fragment>
            <ul style={{ marginBottom: 0, marginTop: 0, paddingInlineStart: 16 }}>
              {props.training.category === TrainingCategory.intervals ? (
                <IntervalsTraining training={props.training} />
              ) : (
                <WarmedUpTraining training={props.training} />
              )}
            </ul>

            <Inliner style={{ marginTop: 8 }}>
              <TrainingCheckbox
                isCompleted={props.training.isCompleted}
                toggleCompleted={toggleCompleted}
              />
              <DistanceComponent
                distance={props.training.totalDistance}
                symbol={totalDistanceSymbol}
              />
              <Time seconds={props.training.totalSeconds} />
            </Inliner>
          </React.Fragment>
        ) : undefined}
      </div>
    </div>
  );
};
