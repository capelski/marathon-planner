import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useMediaQuery } from 'react-responsive';
import collapseImage from '../../static/images/collapse.png';
import expandImage from '../../static/images/expand.png';
import { defaultBaseSettings, defaultCompletedTrainings, defaultSkippedWeeks } from '../constants';
import {
  getDetailedPlan,
  persistSettings,
  toggleSkippedWeek,
  toggleTrainingCompleted,
  retrieveSettings,
  retrieveCollapsedWeeks,
  persistCollapsedWeeks
} from '../logic';
import { BaseSettings, CollapsedWeeks, Settings } from '../types';
import { BaseSettingsComponent } from './base-settings';
import { Inliner } from './inliner';
import { Legend } from './legend';
import { Plan } from './plan';

export const App: React.FC = () => {
  const [baseSettings, setBaseSettings] = useState(defaultBaseSettings);
  const [collapsedWeeks, setCollapsedWeeks] = useState<CollapsedWeeks>({});
  const [completedTrainings, setCompletedTrainings] = useState(defaultCompletedTrainings);
  const [skippedWeeks, setSkippedWeeks] = useState(defaultSkippedWeeks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [plan, setPlan] = useState(
    getDetailedPlan({
      ...defaultBaseSettings,
      completedTrainings: defaultCompletedTrainings,
      skippedWeeks: defaultSkippedWeeks
    })
  );

  const areAllWeeksCollapsed = plan.weeks.every((week) => collapsedWeeks[week.number]);

  const isDesktop = useMediaQuery({ minWidth: 768 });

  const baseSettingsChange = (nextBaseSettings: BaseSettings) => {
    setBaseSettings(nextBaseSettings);
    settingsUpdate({
      ...nextBaseSettings,
      completedTrainings,
      skippedWeeks
    });
  };

  const settingsUpdate = (settings: Settings) => {
    setPlan(getDetailedPlan(settings));
    persistSettings(settings);
  };

  const skippedWeekChange = (weekNumber: number) => {
    const nextSkippedWeeks = toggleSkippedWeek(skippedWeeks, weekNumber);
    setSkippedWeeks(nextSkippedWeeks);
    settingsUpdate({
      ...baseSettings,
      completedTrainings,
      skippedWeeks: nextSkippedWeeks
    });
  };

  const trainingCompletedChange = (weekNumber: number, trainingNumber: number) => {
    const nextCompletedTrainings = toggleTrainingCompleted(
      completedTrainings,
      weekNumber,
      trainingNumber
    );
    setCompletedTrainings(nextCompletedTrainings);
    settingsUpdate({
      ...baseSettings,
      completedTrainings: nextCompletedTrainings,
      skippedWeeks
    });
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const collapsedWeekChange = (weekNumber: number) => {
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
      : plan.weeks.reduce(
          (_collapsedWeeks, week) => ({ ..._collapsedWeeks, [week.number]: true }),
          {}
        );
    setCollapsedWeeks(nextCollapsedWeeks);
    persistCollapsedWeeks(nextCollapsedWeeks);
  };

  useEffect(() => {
    const settings = retrieveSettings();
    if (settings) {
      setBaseSettings({
        distanceUnits: settings.distanceUnits,
        racePace: settings.racePace,
        skipRecovery: settings.skipRecovery,
        startDate: settings.startDate,
        warmUpDistance: settings.warmUpDistance
      });
      setCompletedTrainings(settings.completedTrainings);
      setSkippedWeeks(settings.skippedWeeks);

      setPlan(getDetailedPlan(settings));
    }

    const nextCollapsedWeeks = retrieveCollapsedWeeks();
    if (nextCollapsedWeeks) {
      setCollapsedWeeks(nextCollapsedWeeks);
    }
  }, []);

  return (
    <div>
      <Inliner style={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <h2>Marathon planner</h2>
        <Inliner style={{ alignItems: 'center' }}>
          <img
            height={28}
            onClick={toggleCollapsedWeeks}
            src={areAllWeeksCollapsed ? expandImage : collapseImage}
            style={{ cursor: 'pointer', paddingRight: 8 }}
            width={28}
          />
          <span style={{ cursor: 'pointer', fontSize: 24, paddingRight: 8 }} onClick={toggleModal}>
            ⚙️
          </span>
        </Inliner>
      </Inliner>

      <Modal isOpen={isModalOpen} onRequestClose={toggleModal} style={{ content: { inset: 0 } }}>
        <div style={{ display: 'flex', fontSize: 20, justifyContent: 'end' }}>
          <span onClick={toggleModal} style={{ cursor: 'pointer' }}>
            ✖️
          </span>
        </div>

        <BaseSettingsComponent baseSettings={baseSettings} setBaseSettings={baseSettingsChange} />
      </Modal>

      <Plan
        collapsedWeeks={collapsedWeeks}
        isDesktop={isDesktop}
        plan={plan}
        toggleCollapsedWeek={collapsedWeekChange}
        toggleSkippedWeek={skippedWeekChange}
        toggleTrainingCompleted={trainingCompletedChange}
      />

      <Legend baseSettings={baseSettings} />
    </div>
  );
};
