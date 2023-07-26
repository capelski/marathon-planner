import React from 'react';
import { currentColor, trainingCoreSymbol } from '../constants';
import { TrainingCategory, trainingTypeColors } from '../models';
import { DetailedTraining } from '../types';
import { DistanceComponent } from './distance';
import { IntervalsTraining } from './training/intervals-training';
import { WarmedUpTraining } from './training/warmed-up-training';

export interface TrainingProps {
  isCurrentTraining?: boolean;
  isDesktop: boolean;
  isSkippedWeek: boolean;
  toggleTrainingCompleted: (trainingNumber: number) => void;
  training: DetailedTraining;
  weekDay?: string;
}

const spacing = 4;
const margin = `${spacing}px ${spacing}px 0 0`; // Right and top

export const Training: React.FC<TrainingProps> = (props) => {
  const toggleCompleted = () => props.toggleTrainingCompleted(props.training.number);
  const isActualTraining =
    !props.isSkippedWeek && props.training.category !== TrainingCategory.none;

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
          display: 'flex',
          flexDirection: props.isDesktop ? 'row' : 'column',
          justifyContent: 'center',
          margin,
          minHeight: '1em',
          minWidth: 28,
          padding: `${spacing / 2}px 0`,
          textAlign: 'center'
        }}
      >
        {isActualTraining && (
          <input
            checked={props.training.isCompleted}
            onChange={toggleCompleted}
            style={{ margin: props.isDesktop ? `0 ${spacing}px 0 0` : undefined }}
            type="checkbox"
          />
        )}
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
          <DistanceComponent distance={props.training.distance} symbol={trainingCoreSymbol} />
        ) : props.training.category === TrainingCategory.intervals ? (
          <IntervalsTraining training={props.training} />
        ) : props.training.category === TrainingCategory.warmedUp ? (
          <WarmedUpTraining training={props.training} />
        ) : undefined}
      </div>
    </div>
  );
};
