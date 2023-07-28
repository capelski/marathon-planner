import React from 'react';
import { PacedDistance } from '../../types';
import { DistanceComponent } from '../distance';

interface TrainingTotalsProps {
  distance: PacedDistance;
}

export const TrainingTotals: React.FC<TrainingTotalsProps> = (props) => {
  return (
    <div style={{ fontStyle: 'italic', marginTop: 8 }}>
      <DistanceComponent distance={props.distance} />
    </div>
  );
};
