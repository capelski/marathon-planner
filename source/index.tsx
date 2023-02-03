import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useMediaQuery } from 'react-responsive';
import { BaseSettingsComponent, Legend, Plan, StatsComponent } from './components';
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
      <h1>Marathon planner</h1>

      <BaseSettingsComponent baseSettings={baseSettings} setBaseSettings={baseSettingsChange} />

      <Plan isDesktop={isDesktop} plan={plan} toggleTrainingCompleted={trainingCompletedChange} />

      <Legend />

      <StatsComponent plan={plan} />
    </div>
  );
};

const appPlaceholder = document.getElementById('app-placeholder');
ReactDOM.render(<App />, appPlaceholder);
