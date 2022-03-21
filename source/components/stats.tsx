import React from 'react';
import { totalDistanceSymbol } from '../constants';
import { DetailedPlan } from '../types';
import { DistanceComponent } from './distance';
import { Inliner } from './inliner';
import { Time } from './time';

export interface StatsProps {
  plan: DetailedPlan;
}

export const Stats: React.FC<StatsProps> = (props) => {
  return (
    <div>
      <h2>Stats</h2>
      <Inliner>
        <DistanceComponent distance={props.plan.totalDistance} symbol={totalDistanceSymbol} />
        <Time seconds={props.plan.totalSeconds} />
      </Inliner>
    </div>
  );
};
