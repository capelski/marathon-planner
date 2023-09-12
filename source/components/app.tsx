import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import collapseImage from '../../static/images/collapse.png';
import expandImage from '../../static/images/expand.png';
import { defaultConfiguration } from '../constants';
import {
  getDetailedPlan,
  persistConfiguration,
  retrieveConfiguration,
  toggleAllExpandedWeeks,
  toggleExpandedWeek,
  toggleSkippedWeek,
  toggleTrainingCompleted
} from '../logic';
import { Configuration } from '../types';
import { ConfigurationComponent } from './configuration';
import { Inliner } from './inliner';
import { Legend } from './legend';
import { Modal } from './modal';
import { Plan } from './plan';

export const App: React.FC = () => {
  const [configuration, setConfiguration] = useState(defaultConfiguration);
  const [displaySettingsMenu, setDisplaySettingsMenu] = useState(false);
  const [plan, setPlan] = useState(getDetailedPlan(defaultConfiguration));

  const areAllWeeksCollapsed = plan.weeks.every(
    (week) => !configuration.expandedWeeks[week.number]
  );

  const isDesktop = useMediaQuery({ minWidth: 768 });

  const toggleAllExpandedWeeksHandler = () => {
    const nextExpandedWeeks = toggleAllExpandedWeeks(plan, areAllWeeksCollapsed);

    updateConfiguration({
      ...configuration,
      expandedWeeks: nextExpandedWeeks
    });
  };

  const toggleExpandedWeekHandler = (weekNumber: number) => {
    const nextExpandedWeeks = toggleExpandedWeek(configuration.expandedWeeks, weekNumber);

    updateConfiguration({
      ...configuration,
      expandedWeeks: nextExpandedWeeks
    });
  };

  const toggleSkippedWeekHandler = (weekNumber: number) => {
    const nextSkippedWeeks = toggleSkippedWeek(configuration.skippedWeeks, weekNumber);

    updateConfiguration({
      ...configuration,
      skippedWeeks: nextSkippedWeeks
    });
  };

  const toggleTrainingCompletedHandler = (weekNumber: number, trainingNumber: number) => {
    const nextCompletedTrainings = toggleTrainingCompleted(
      configuration.completedTrainings,
      weekNumber,
      trainingNumber
    );

    updateConfiguration({
      ...configuration,
      completedTrainings: nextCompletedTrainings
    });
  };

  const updateConfiguration = (
    nextConfiguration: Configuration,
    { persist }: { persist?: boolean } = { persist: true }
  ) => {
    setConfiguration(nextConfiguration);
    setPlan(getDetailedPlan(nextConfiguration));
    if (persist) {
      persistConfiguration(nextConfiguration);
    }
  };

  useEffect(() => {
    const configuration = retrieveConfiguration();
    if (configuration) {
      updateConfiguration(configuration, { persist: false });
    }
  }, []);

  return (
    <div>
      <Inliner style={{ justifyContent: 'space-between' }}>
        <h2>Marathon planner</h2>
        <Inliner>
          <img
            height={28}
            onClick={toggleAllExpandedWeeksHandler}
            src={areAllWeeksCollapsed ? expandImage : collapseImage}
            style={{ cursor: 'pointer', paddingRight: 8 }}
            width={28}
          />
          <span
            style={{ cursor: 'pointer', fontSize: 24, paddingRight: 8 }}
            onClick={() => setDisplaySettingsMenu(true)}
          >
            ⚙️
          </span>
        </Inliner>
      </Inliner>

      {displaySettingsMenu && (
        <Modal closeHandler={() => setDisplaySettingsMenu(false)} style={{ textAlign: 'center' }}>
          <ConfigurationComponent
            configuration={configuration}
            updateConfiguration={updateConfiguration}
          />
        </Modal>
      )}
      <Plan
        expanded={configuration.expandedWeeks}
        isDesktop={isDesktop}
        plan={plan}
        toggleExpandedWeek={toggleExpandedWeekHandler}
        toggleSkippedWeek={toggleSkippedWeekHandler}
        toggleTrainingCompleted={toggleTrainingCompletedHandler}
      />

      <Legend settings={configuration.settings} />
    </div>
  );
};
