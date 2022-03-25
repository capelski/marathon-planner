import React, { useEffect, useState } from 'react';
import { persistCollapsedWeeks, retrieveCollapsedWeeks } from '../logic';
import { CollapsedWeeks, DetailedPlan } from '../types';
import { Week } from './week';

export interface PlanProps {
  isDesktop: boolean;
  plan: DetailedPlan;
  toggleTrainingCompleted: (weekNumber: number, trainingNumber: number) => void;
}

export const Plan: React.FC<PlanProps> = (props) => {
  const [collapsedWeeks, setCollapsedWeeks] = useState<CollapsedWeeks>({});
  const areAllWeeksCollapsed = props.plan.weeks.every((week) => collapsedWeeks[week.number]);

  useEffect(() => {
    const nextCollapsedWeeks = retrieveCollapsedWeeks();
    if (nextCollapsedWeeks) {
      setCollapsedWeeks(nextCollapsedWeeks);
    }
  }, []);

  const changeCollapsedStatus = (weekNumber: number) => {
    const nextCollapsedWeeks = {
      ...collapsedWeeks,
      [weekNumber]: !collapsedWeeks[weekNumber]
    };
    setCollapsedWeeks(nextCollapsedWeeks);
    persistCollapsedWeeks(nextCollapsedWeeks);
  };

  const toggleCollapsedWeeks = () => {
    const nextCollapsedWeeks = areAllWeeksCollapsed
      ? {}
      : props.plan.weeks.reduce(
          (_collapsedWeeks, week) => ({ ..._collapsedWeeks, [week.number]: true }),
          {}
        );
    setCollapsedWeeks(nextCollapsedWeeks);
    persistCollapsedWeeks(nextCollapsedWeeks);
  };

  return (
    <React.Fragment>
      <h2 onClick={toggleCollapsedWeeks} style={{ cursor: 'pointer' }}>
        <span>{areAllWeeksCollapsed ? '☞' : '☟'}</span> Plan
      </h2>
      {props.plan.weeks.map((week) => {
        return (
          <Week
            isCollapsed={collapsedWeeks[week.number]}
            isDesktop={props.isDesktop}
            key={week.number}
            toggleIsCollapsed={() => changeCollapsedStatus(week.number)}
            toggleTrainingCompleted={props.toggleTrainingCompleted}
            week={week}
          />
        );
      })}
    </React.Fragment>
  );
};
