import React from 'react';
import { trainingCoreSymbol } from '../../constants';
import { TrainingType, trainingTypeColors } from '../../models';
import { DetailedTraining } from '../../types';
import { DistanceComponent } from '../distance';
import { IntervalsTraining } from './intervals-training';
import { WarmedUpTrainingComponent } from './warmed-up-training';

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
      {props.training.type === TrainingType.longRun ||
      props.training.type === TrainingType.moderate ||
      props.training.type === TrainingType.race ||
      props.training.type === TrainingType.recovery ? (
        <DistanceComponent distance={props.training.distance} symbol={trainingCoreSymbol} />
      ) : props.training.type === TrainingType.speed ||
        props.training.type === TrainingType.strength ? (
        <IntervalsTraining training={props.training} />
      ) : props.training.type === TrainingType.timed ? (
        <WarmedUpTrainingComponent warmUpDistance={props.training.warmUpDistance}>
          <DistanceComponent distance={props.training.distance} symbol={trainingCoreSymbol} />
        </WarmedUpTrainingComponent>
      ) : undefined}
    </div>
  );
};
