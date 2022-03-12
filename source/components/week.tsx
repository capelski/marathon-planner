import React, { useState } from 'react';
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
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div>
      <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
        <h4>
          <span
            onClick={() => {
              setIsCollapsed(!isCollapsed);
            }}
            style={{ cursor: 'pointer' }}
          >
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
          {props.week.trainings.map((training) => {
            return (
              <Training
                distanceUnits={props.distanceUnits}
                isDesktop={props.isDesktop}
                training={training}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
