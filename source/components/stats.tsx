import React from 'react';
import { completedColor, remainingColor, totalDistanceSymbol } from '../constants';
import { DetailedPlan } from '../types';
import { ChartComponent } from './chart';
import { DistanceComponent } from './distance';
import { Inliner } from './inliner';
import { Time } from './time';

export interface StatsComponentProps {
  plan: DetailedPlan;
}

const round = (number: number) => Math.floor(100 * number) / 100;

export const StatsComponent: React.FC<StatsComponentProps> = (props) => {
  const completed = round(props.plan.completed.distance.value);
  const remaining = round(props.plan.remaining.distance.value);
  const missed = round(props.plan.missed.distance.value);

  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ margin: 'auto', maxWidth: '100%', width: 300 }}>
        <ChartComponent
          data={[
            {
              backgroundColor: completedColor,
              label: `Completed (${completed}km)`,
              value: completed
            },
            {
              backgroundColor: remainingColor,
              label: `Remaining (${remaining}km)`,
              value: remaining
            },
            {
              label: `Missed (${missed}km)`,
              value: missed
            }
          ]}
          options={{
            animation: {
              duration: 0
            },
            legend: {
              position: 'right'
            }
          }}
          type="doughnut"
        />
      </div>

      <Inliner style={{ marginBottom: 12, justifyContent: 'center' }}>
        <DistanceComponent distance={props.plan.total.distance} symbol={totalDistanceSymbol} />
        <Time seconds={props.plan.total.seconds} />
      </Inliner>
    </div>
  );
};
