import React, { useEffect, useState } from 'react';
import { totalDistanceSymbol } from '../constants';
import { DetailedWeek } from '../types';
import { DistanceComponent } from './distance';
import { Time } from './time';
import { Training } from './training';

export interface WeekProps {
  isCollapsed?: boolean;
  isDesktop: boolean;
  toggleIsCollapsed: () => void;
  week: DetailedWeek;
}

export const Week: React.FC<WeekProps> = (props) => {
  return (
    <div>
      <div
        onClick={props.toggleIsCollapsed}
        style={{ alignItems: 'center', cursor: 'pointer', display: 'flex' }}
      >
        <h4 style={{ flexGrow: 1 }}>
          <span>{props.isCollapsed ? '☞' : '☟'}</span> Week {props.week.number}
        </h4>
        <DistanceComponent distance={props.week.totalDistance} symbol={totalDistanceSymbol} />
        <Time seconds={props.week.totalSeconds} />
      </div>
      {!props.isCollapsed && (
        <div
          className="week"
          style={{ display: 'flex', flexDirection: props.isDesktop ? 'row' : 'column' }}
        >
          {props.week.trainings.map((training, index) => {
            return <Training isDesktop={props.isDesktop} key={index} training={training} />;
          })}
        </div>
      )}
    </div>
  );
};
