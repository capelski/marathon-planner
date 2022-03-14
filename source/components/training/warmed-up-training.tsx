import React from 'react';
import { coolDownSymbol, warmUpSymbol } from '../../constants';
import { PacedDistance } from '../../types';
import { PacedDistanceComponent } from '../paced-distance';

export interface WarmedUpTrainingProps {
  warmUpDistance: PacedDistance;
}

export const WarmedUpTrainingComponent: React.FC<WarmedUpTrainingProps> = (props) => {
  return (
    <div>
      <PacedDistanceComponent distance={props.warmUpDistance} symbol={warmUpSymbol} />
      {props.children}
      <PacedDistanceComponent distance={props.warmUpDistance} symbol={coolDownSymbol} />
    </div>
  );
};
