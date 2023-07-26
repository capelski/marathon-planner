import React from 'react';
import { totalDistanceSymbol } from '../../constants';
import { Distance } from '../../types';
import { DistanceComponent } from '../distance';
import { Inliner } from '../inliner';
import { Time } from '../time';

interface TrainingTotalsProps {
  distance: Distance;
  seconds: number;
}

export const TrainingTotals: React.FC<TrainingTotalsProps> = (props) => {
  return (
    <Inliner style={{ fontStyle: 'italic', marginTop: 8 }}>
      <DistanceComponent distance={props.distance} symbol={totalDistanceSymbol} />
      <Time seconds={props.seconds} />
    </Inliner>
  );
};
