import React from 'react';
import { coolDownSymbol, trainingCoreSymbol, warmUpSymbol } from '../../constants';
import { DetailedWarmedUpTraining } from '../../types';
import { DistanceComponent } from '../distance';

export interface WarmedUpTrainingProps {
  training: DetailedWarmedUpTraining;
}

export const WarmedUpTraining: React.FC<WarmedUpTrainingProps> = (props) => {
  return (
    <div>
      <DistanceComponent distance={props.training.warmUpDistance} symbol={warmUpSymbol} />
      <DistanceComponent distance={props.training.distance} symbol={trainingCoreSymbol} />
      <DistanceComponent distance={props.training.warmUpDistance} symbol={coolDownSymbol} />
    </div>
  );
};
