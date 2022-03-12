import React from 'react';
import { getWeekDistance } from '../logic';
import { DistanceUnits } from '../models';
import { FullPlan } from '../types';
import { Distance } from './distance';
import { Training } from './training';

export interface PlanProps {
  distanceUnits: DistanceUnits;
  isDesktop: boolean;
  plan: FullPlan;
}

export const Plan: React.FC<PlanProps> = (props) => {
  return (
    <React.Fragment>
      <h2>Plan</h2>
      {props.plan.map((week) => {
        return (
          <div>
            <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
              <h4>Week {week.number}</h4>
              <div>
                👟{' '}
                <Distance
                  displayUnits={true}
                  distance={getWeekDistance(week)}
                  distanceUnits={props.distanceUnits}
                />
              </div>
            </div>
            <div
              className="week"
              style={{ display: 'flex', flexDirection: props.isDesktop ? 'row' : 'column' }}
            >
              {week.trainings.map((training) => {
                return (
                  <Training
                    distanceUnits={props.distanceUnits}
                    isDesktop={props.isDesktop}
                    training={training}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </React.Fragment>
  );
};
