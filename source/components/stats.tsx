import React from 'react';
import { totalDistanceSymbol } from '../constants';
import { DetailedPlan } from '../types';
import { DistanceComponent } from './distance';
import { Inliner } from './inliner';
import { Time } from './time';

export interface StatsComponentProps {
  plan: DetailedPlan;
}

export const StatsComponent: React.FC<StatsComponentProps> = (props) => {
  return (
    <div style={{ marginBottom: 12 }}>
      <Inliner>
        <DistanceComponent distance={props.plan.total.distance} symbol={totalDistanceSymbol} />
        (<DistanceComponent distance={props.plan.completed.distance} /> completed,{' '}
        {Math.floor(
          (10000 * props.plan.completed.distance.value) / props.plan.total.distance.value
        ) / 100}
        %)
      </Inliner>
      <Inliner>
        <Time seconds={props.plan.total.seconds} />
        (<Time hideSymbol={true} seconds={props.plan.completed.seconds} /> completed,{' '}
        {Math.floor((10000 * props.plan.completed.seconds) / props.plan.total.seconds) / 100}
        %)
      </Inliner>
    </div>
  );
};
