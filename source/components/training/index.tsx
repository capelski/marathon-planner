import React from 'react';
import { currentColor, totalDistanceSymbol } from '../../constants';
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
  isCurrentTraining?: boolean;
  isDesktop: boolean;
  toggleTrainingCompleted: (trainingNumber: number) => void;
  training: DetailedTraining;
  weekDay?: string;
}

const spacing = 4;
const margin = `${spacing}px ${spacing}px 0 0`; // Right and top

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
          backgroundColor: trainingTypeColors[props.training.type].backgroundColor,
          color: trainingTypeColors[props.training.type].textColor,
          margin,
          minHeight: '1em',
          minWidth: 24,
          padding: `${spacing / 2}px 0`,
          textAlign: 'center'
        }}
      >
        {props.weekDay}
      </div>
      <div
        style={{
          backgroundColor: props.isCurrentTraining ? currentColor : undefined,
          flexGrow: 1,
          margin,
          padding: `${spacing * 2}px ${spacing}px`
        }}
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
