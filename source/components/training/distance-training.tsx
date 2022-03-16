import React from 'react';
import { trainingCoreSymbol } from '../../constants';
import { DetailedDistanceTraining } from '../../types';
import { DistanceComponent } from '../distance';

export interface DistanceTrainingProps {
  training: DetailedDistanceTraining;
}

export const DistanceTraining: React.FC<DistanceTrainingProps> = (props) => {
  return (
    <li>
      <DistanceComponent distance={props.training.distance} symbol={trainingCoreSymbol} />
    </li>
  );
};
