import React, { useEffect, useState } from 'react';
import { DetailedPlan, Dictionary } from '../types';
import { Week } from './week';

export interface PlanProps {
  isDesktop: boolean;
  plan: DetailedPlan;
}

const collapsedWeeksKey = 'collapsedWeeks';

export const Plan: React.FC<PlanProps> = (props) => {
  const [collapsedWeeks, setCollapsedWeeks] = useState<Dictionary<boolean, number>>({});

  useEffect(() => {
    const _collapsedWeeks = localStorage.getItem(collapsedWeeksKey);
    if (_collapsedWeeks) {
      setCollapsedWeeks(JSON.parse(_collapsedWeeks));
    }
  }, []);

  const changeCollapseStatus = (weekNumber: number) => {
    const nextCollapsedWeeks = {
      ...collapsedWeeks,
      [weekNumber]: !collapsedWeeks[weekNumber]
    };
    setCollapsedWeeks(nextCollapsedWeeks);
    localStorage.setItem(collapsedWeeksKey, JSON.stringify(nextCollapsedWeeks));
  };

  return (
    <React.Fragment>
      <h2>Plan</h2>
      {props.plan.map((week) => {
        return (
          <Week
            isCollapsed={collapsedWeeks[week.number]}
            isDesktop={props.isDesktop}
            key={week.number}
            toggleIsCollapsed={() => changeCollapseStatus(week.number)}
            week={week}
          />
        );
      })}
    </React.Fragment>
  );
};
