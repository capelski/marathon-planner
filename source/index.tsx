import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { useMediaQuery } from 'react-responsive';
import { BaseSettingsComponent, Inliner, Legend, Plan } from './components';
import { defaultBaseSettings, defaultCompletedTrainings } from './constants';
import {
  getDetailedPlan,
  persistSettings,
  retrieveSettings,
  toggleTrainingCompleted
} from './logic';
import { BaseSettings, Settings } from './types';

const App: React.FC = () => {
  const [baseSettings, setBaseSettings] = useState(defaultBaseSettings);
  const [completedTrainings, setCompletedTrainings] = useState(defaultCompletedTrainings);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [plan, setPlan] = useState(
    getDetailedPlan({
      ...defaultBaseSettings,
      completedTrainings: defaultCompletedTrainings
    })
  );

  const isDesktop = useMediaQuery({ minWidth: 768 });

  const baseSettingsChange = (nextBaseSettings: BaseSettings) => {
    setBaseSettings(nextBaseSettings);
    settingsUpdate({
      ...nextBaseSettings,
      completedTrainings
    });
  };

  const settingsUpdate = (settings: Settings) => {
    setPlan(getDetailedPlan(settings));
    persistSettings(settings);
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
      completedTrainings: nextCompletedTrainings
    });
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

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

      setPlan(getDetailedPlan(settings));
    }
  }, []);

  return (
    <div>
      <Inliner style={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <h2>Marathon planner</h2>
        <span style={{ cursor: 'pointer', fontSize: 24, paddingRight: 8 }} onClick={toggleModal}>
          ⚙️
        </span>
      </Inliner>

      <Modal isOpen={isModalOpen} onRequestClose={toggleModal} style={{ content: { inset: 0 } }}>
        <div style={{ display: 'flex', fontSize: 20, justifyContent: 'end' }}>
          <span onClick={toggleModal} style={{ cursor: 'pointer' }}>
            ✖️
          </span>
        </div>

        <BaseSettingsComponent baseSettings={baseSettings} setBaseSettings={baseSettingsChange} />
      </Modal>

      <Plan isDesktop={isDesktop} plan={plan} toggleTrainingCompleted={trainingCompletedChange} />

      <Legend />
    </div>
  );
};

const appPlaceholder = document.getElementById('app-placeholder');

Modal.setAppElement(appPlaceholder!);
ReactDOM.render(<App />, appPlaceholder);
