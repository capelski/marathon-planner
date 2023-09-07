import React from 'react';
import { DetailedPlan, ExpandedWeeks } from '../types';
import { StatsComponent } from './stats';
import { Week } from './week';

export interface PlanProps {
  expanded: ExpandedWeeks;
  isDesktop: boolean;
  plan: DetailedPlan;
  toggleExpandedWeek: (weekNumber: number) => void;
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
            isExpanded={props.expanded[week.number]}
            isDesktop={props.isDesktop}
            key={week.number}
            toggleExpandedWeek={() => props.toggleExpandedWeek(week.number)}
            toggleSkippedWeek={props.toggleSkippedWeek}
            toggleTrainingCompleted={props.toggleTrainingCompleted}
            week={week}
          />
        );
      })}
    </React.Fragment>
  );
};
