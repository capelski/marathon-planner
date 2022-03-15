import React from 'react';
import { trainingCoreSymbol } from '../../constants';
import { TrainingCategory, trainingTypeColors } from '../../models';
import { DetailedTraining } from '../../types';
import { DistanceComponent } from '../distance';
import { IntervalsTraining } from './intervals-training';
import { WarmedUpTraining } from './warmed-up-training';

export interface TrainingProps {
  isDesktop: boolean;
  training: DetailedTraining;
}

export const Training: React.FC<TrainingProps> = (props) => {
  return (
    <div
      className="day"
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: props.isDesktop ? 'column' : 'row',
        width: props.isDesktop ? '14.28%' : undefined
      }}
    >
      <div
        style={{
          backgroundColor: trainingTypeColors[props.training.type],
          height: props.isDesktop ? 16 : 24,
          marginBottom: 4,
          width: props.isDesktop ? 'calc(100% - 4px)' : 40
        }}
      />
      {props.training.category === TrainingCategory.distance ? (
        <DistanceComponent distance={props.training.distance} symbol={trainingCoreSymbol} />
      ) : props.training.category === TrainingCategory.intervals ? (
        <IntervalsTraining training={props.training} />
      ) : props.training.category === TrainingCategory.warmedUp ? (
        <WarmedUpTraining training={props.training} />
      ) : undefined}
    </div>
  );
};
