import React from 'react';
import { CollapsedWeeks, DetailedPlan } from '../types';
import { StatsComponent } from './stats';
import { Week } from './week';

export interface PlanProps {
  collapsedWeeks: CollapsedWeeks;
  isDesktop: boolean;
  plan: DetailedPlan;
  toggleCollapsedWeek: (weekNumber: number) => void;
  toggleSkippedWeek: (weekNumber: number) => void;
  toggleTrainingCompleted: (weekNumber: number, trainingNumber: number) => void;
}

export const Plan: React.FC<PlanProps> = (props) => {
  return (
    <React.Fragment>
      <StatsComponent plan={props.plan} />
      {props.plan.weeks.map((week) => {
        return (
          <Week
            isCollapsed={props.collapsedWeeks[week.number]}
            isDesktop={props.isDesktop}
            key={week.number}
            toggleIsCollapsed={() => props.toggleCollapsedWeek(week.number)}
            toggleSkippedWeek={props.toggleSkippedWeek}
            toggleTrainingCompleted={props.toggleTrainingCompleted}
            week={week}
          />
        );
      })}
    </React.Fragment>
  );
};
