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
    <div>
      <h2>Stats</h2>
      <h3>Totals</h3>
      <Inliner>
        <DistanceComponent distance={props.plan.total.distance} symbol={totalDistanceSymbol} />
        <Time seconds={props.plan.total.seconds} />
      </Inliner>
      <h3>Completed</h3>
      <Inliner>
        <DistanceComponent distance={props.plan.completed.distance} symbol={totalDistanceSymbol} />
        <Time seconds={props.plan.completed.seconds} />
      </Inliner>
    </div>
  );
};
