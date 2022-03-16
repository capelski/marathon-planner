import React, { useEffect, useState } from 'react';
import { totalDistanceSymbol } from '../constants';
import { DetailedWeek } from '../types';
import { DistanceComponent } from './distance';
import { Time } from './time';
import { Training } from './training';

export interface WeekProps {
  isDesktop: boolean;
  week: DetailedWeek;
}

export const Week: React.FC<WeekProps> = (props) => {
  const weekKey = `is-week-${props.week.number}-collapsed`;

  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const _isCollapsed = localStorage.getItem(weekKey);
    if (_isCollapsed) {
      setIsCollapsed(JSON.parse(_isCollapsed));
    }
  }, []);

  const changeCollapseStatus = () => {
    const nextIsCollapsed = !isCollapsed;
    setIsCollapsed(nextIsCollapsed);
    localStorage.setItem(weekKey, JSON.stringify(nextIsCollapsed));
  };

  return (
    <div>
      <div
        onClick={changeCollapseStatus}
        style={{ alignItems: 'center', cursor: 'pointer', display: 'flex' }}
      >
        <h4 style={{ flexGrow: 1 }}>
          <span>{isCollapsed ? '☞' : '☟'}</span> Week {props.week.number}
        </h4>
        <DistanceComponent distance={props.week.totalDistance} symbol={totalDistanceSymbol} />
        <Time seconds={props.week.totalSeconds} />
      </div>
      {!isCollapsed && (
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
