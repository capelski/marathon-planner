import React from 'react';
import { DetailedPlan } from '../types';
import { Week } from './week';

export interface PlanProps {
  isDesktop: boolean;
  plan: DetailedPlan;
}

export const Plan: React.FC<PlanProps> = (props) => {
  return (
    <React.Fragment>
      <h2>Plan</h2>
      {props.plan.map((week) => {
        return <Week isDesktop={props.isDesktop} key={week.number} week={week} />;
      })}
    </React.Fragment>
  );
};
