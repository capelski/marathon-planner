import React from 'react';
import { coolDownSymbol, trainingCoreSymbol, warmUpSymbol } from '../constants';
import {
  getIntervals,
  getRegularDistance,
  getRegularPace,
  getWarmUpDistance,
  getWarmUpPace
} from '../logic';
import { trainingTypeColors } from '../models';
import { DetailedTraining } from '../types';
import { IntervalsDistance } from './intervals-distance';
import { PacedDistanceComponent } from './paced-distance';

export interface TrainingProps {
  isDesktop: boolean;
  training: DetailedTraining;
}

export const Training: React.FC<TrainingProps> = (props) => {
  const regularDistance = getRegularDistance(props.training);
  const regularPace = getRegularPace(props.training);
  const intervals = getIntervals(props.training);
  const warmUpDistance = getWarmUpDistance(props.training);
  const warmUpPace = getWarmUpPace(props.training);

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
      <div>
        {warmUpDistance && warmUpPace && (
          <PacedDistanceComponent distance={warmUpDistance} symbol={warmUpSymbol} />
        )}
        {regularDistance && regularPace && (
          <PacedDistanceComponent distance={regularDistance} symbol={trainingCoreSymbol} />
        )}
        {intervals && <IntervalsDistance intervals={intervals} />}
        {warmUpDistance && warmUpPace && (
          <PacedDistanceComponent distance={warmUpDistance} symbol={coolDownSymbol} />
        )}
      </div>
    </div>
  );
};
