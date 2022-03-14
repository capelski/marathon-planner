import React from 'react';
import { coolDownSymbol, warmUpSymbol } from '../../constants';
import { PacedDistance } from '../../types';
import { DistanceComponent } from '../distance';

export interface WarmedUpTrainingProps {
  warmUpDistance: PacedDistance;
}

export const WarmedUpTrainingComponent: React.FC<WarmedUpTrainingProps> = (props) => {
  return (
    <div>
      <DistanceComponent distance={props.warmUpDistance} symbol={warmUpSymbol} />
      {props.children}
      <DistanceComponent distance={props.warmUpDistance} symbol={coolDownSymbol} />
    </div>
  );
};
