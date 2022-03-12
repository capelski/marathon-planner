import React, { useEffect, useState } from 'react';
import { getWeekDistance } from '../logic';
import { DistanceUnits } from '../models';
import { FullWeek } from '../types';
import { Distance } from './distance';
import { Training } from './training';

export interface WeekProps {
  distanceUnits: DistanceUnits;
  isDesktop: boolean;
  week: FullWeek;
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
      <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
        <h4>
          <span onClick={changeCollapseStatus} style={{ cursor: 'pointer' }}>
            {isCollapsed ? '☞' : '☟'}
          </span>{' '}
          Week {props.week.number}
        </h4>
        <div>
          👟{' '}
          <Distance
            displayUnits={true}
            distance={getWeekDistance(props.week)}
            distanceUnits={props.distanceUnits}
          />
        </div>
      </div>
      {!isCollapsed && (
        <div
          className="week"
          style={{ display: 'flex', flexDirection: props.isDesktop ? 'row' : 'column' }}
        >
          {props.week.trainings.map((training, index) => {
            return (
              <Training
                distanceUnits={props.distanceUnits}
                isDesktop={props.isDesktop}
                key={index}
                training={training}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
