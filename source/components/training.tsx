import React from 'react';
import { coolDownSymbol, trainingCoreSymbol, warmUpSymbol } from '../constants';
import { getIntervals, getRegularDistance, getWarmUpDistance } from '../logic';
import { trainingTypeColors, DistanceUnits } from '../models';
import { FullTraining } from '../types';
import { IntervalsDistance } from './intervals-distance';
import { RegularDistance } from './regular-distance';

export interface TrainingProps {
  distanceUnits: DistanceUnits;
  isDesktop: boolean;
  training: FullTraining;
}

export const Training: React.FC<TrainingProps> = (props) => {
  const regularDistance = getRegularDistance(props.training);
  const intervals = getIntervals(props.training);
  const warmUpDistance = getWarmUpDistance(props.training);

  return (
    <div className="day" style={{ alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
      <div
        style={{
          backgroundColor: trainingTypeColors[props.training.type],
          height: 24,
          marginBottom: 4,
          width: 48
        }}
      />
      {warmUpDistance > 0 && (
        <RegularDistance
          displayUnits={props.isDesktop}
          distance={warmUpDistance}
          distanceUnits={props.distanceUnits}
          symbol={warmUpSymbol}
        />
      )}
      {regularDistance > 0 && (
        <RegularDistance
          displayUnits={props.isDesktop}
          distance={regularDistance}
          distanceUnits={props.distanceUnits}
          symbol={trainingCoreSymbol}
        />
      )}
      {intervals && (
        <IntervalsDistance
          displayUnits={props.isDesktop}
          distanceUnits={props.distanceUnits}
          intervals={intervals}
        />
      )}
      {warmUpDistance > 0 && (
        <RegularDistance
          displayUnits={props.isDesktop}
          distance={warmUpDistance}
          distanceUnits={props.distanceUnits}
          symbol={coolDownSymbol}
        />
      )}
    </div>
  );
};
