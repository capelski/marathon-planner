import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import collapseImage from '../../static/images/collapse.png';
import expandImage from '../../static/images/expand.png';
import { defaultConfiguration } from '../constants';
import {
  getDetailedPlan,
  persistConfiguration,
  retrieveConfiguration,
  toggleAllCollapsedWeeks,
  toggleCollapsedWeek,
  toggleSkippedWeek,
  toggleTrainingCompleted
} from '../logic';
import { Configuration, Settings } from '../types';
import { Inliner } from './inliner';
import { Legend } from './legend';
import { Modal } from './modal';
import { Plan } from './plan';
import { SettingsComponent } from './settings';

export const App: React.FC = () => {
  const [configuration, setConfiguration] = useState(defaultConfiguration);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [plan, setPlan] = useState(getDetailedPlan(defaultConfiguration));

  const areAllWeeksCollapsed = plan.weeks.every(
    (week) => configuration.collapsedWeeks[week.number]
  );

  const isDesktop = useMediaQuery({ minWidth: 768 });

  const settingsChangeHandler = (nextSettings: Settings) => {
    updateConfiguration({
      ...configuration,
      settings: nextSettings
    });
  };

  const toggleAllCollapsedWeeksHandler = () => {
    const nextCollapsedWeeks = toggleAllCollapsedWeeks(plan, !areAllWeeksCollapsed);

    updateConfiguration({
      ...configuration,
      collapsedWeeks: nextCollapsedWeeks
    });
  };

  const toggleCollapsedWeekHandler = (weekNumber: number) => {
    const nextCollapsedWeeks = toggleCollapsedWeek(configuration.collapsedWeeks, weekNumber);

    updateConfiguration({
      ...configuration,
      collapsedWeeks: nextCollapsedWeeks
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
            onClick={toggleAllCollapsedWeeksHandler}
            src={areAllWeeksCollapsed ? expandImage : collapseImage}
            style={{ cursor: 'pointer', paddingRight: 8 }}
            width={28}
          />
          <span
            style={{ cursor: 'pointer', fontSize: 24, paddingRight: 8 }}
            onClick={() => setIsModalOpen(true)}
          >
            ⚙️
          </span>
        </Inliner>
      </Inliner>

      {isModalOpen && (
        <Modal closeHandler={() => setIsModalOpen(false)}>
          <SettingsComponent
            settings={configuration.settings}
            setSettings={settingsChangeHandler}
          />
        </Modal>
      )}

      <Plan
        collapsedWeeks={configuration.collapsedWeeks}
        isDesktop={isDesktop}
        plan={plan}
        toggleCollapsedWeek={toggleCollapsedWeekHandler}
        toggleSkippedWeek={toggleSkippedWeekHandler}
        toggleTrainingCompleted={toggleTrainingCompletedHandler}
      />

      <Legend settings={configuration.settings} />
    </div>
  );
};
