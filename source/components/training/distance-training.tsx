import React from 'react';
import { trainingCoreSymbol } from '../../constants';
import { DetailedDistanceTraining } from '../../types';
import { DistanceComponent } from '../distance';
import { TrainingCheckbox } from './training-checkbox';

export interface DistanceTrainingProps {
  toggleCompleted: () => void;
  training: DetailedDistanceTraining;
}

export const DistanceTraining: React.FC<DistanceTrainingProps> = (props) => {
  return (
    <DistanceComponent distance={props.training.distance} symbol={trainingCoreSymbol}>
      <TrainingCheckbox
        isCompleted={props.training.isCompleted}
        toggleCompleted={props.toggleCompleted}
      />
    </DistanceComponent>
  );
};
