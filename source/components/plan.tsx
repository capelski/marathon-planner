import React from 'react';
import { DistanceUnits } from '../models';
import { FullPlan } from '../types';
import { Week } from './week';

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
          <Week
            distanceUnits={props.distanceUnits}
            isDesktop={props.isDesktop}
            key={week.number}
            week={week}
          />
        );
      })}
    </React.Fragment>
  );
};
