import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useMediaQuery } from 'react-responsive';
import { Legend, SettingsComponent, Plan, StatsComponent } from './components';
import {
  defaultCompletedTrainings,
  defaultDistanceUnits,
  defaultRacePace,
  defaultWarmUpDistance
} from './constants';
import {
  convertPace,
  getDetailedPlan,
  persistSettings,
  retrieveSettings,
  toggleTrainingCompleted
} from './logic';
import { DistanceUnits } from './models';
import { Distance, Pace, Settings } from './types';

const App: React.FC = () => {
  const [completedTrainings, setCompletedTrainings] = useState(defaultCompletedTrainings);
  const [distanceUnits, setDistanceUnits] = useState(defaultDistanceUnits);
  const [plan, setPlan] = useState(
    getDetailedPlan(defaultWarmUpDistance, defaultRacePace, defaultCompletedTrainings, undefined)
  );
  const [racePace, setRacePace] = useState(defaultRacePace);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [warmUpDistance, setWarmUpDistance] = useState(defaultWarmUpDistance);

  const isDesktop = useMediaQuery({ minWidth: 768 });

  const distanceUnitsChange = (nextDistanceUnits: DistanceUnits) => {
    const nextRacePace = convertPace(racePace, nextDistanceUnits);
    setDistanceUnits(nextDistanceUnits);
    setRacePace(nextRacePace);

    settingsUpdate({
      distanceUnits: nextDistanceUnits,
      completedTrainings,
      racePace: nextRacePace,
      startDate,
      warmUpDistance
    });
  };

  const racePaceChange = (nextRacePace: Pace) => {
    setRacePace(nextRacePace);
    settingsUpdate({
      distanceUnits,
      completedTrainings,
      racePace: nextRacePace,
      startDate,
      warmUpDistance
    });
  };

  const settingsUpdate = (settings: Settings) => {
    setPlan(
      getDetailedPlan(
        settings.warmUpDistance,
        settings.racePace,
        settings.completedTrainings,
        settings.startDate
      )
    );

    persistSettings(settings);
  };

  const startDateChange = (nextStartDate: Date | undefined) => {
    setStartDate(nextStartDate);
    settingsUpdate({
      distanceUnits,
      completedTrainings,
      racePace,
      startDate: nextStartDate,
      warmUpDistance
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
      distanceUnits,
      completedTrainings: nextCompletedTrainings,
      racePace,
      startDate,
      warmUpDistance
    });
  };

  const warmUpDistanceChange = (nextWarmUpDistance: Distance) => {
    setWarmUpDistance(nextWarmUpDistance);
    settingsUpdate({
      distanceUnits,
      completedTrainings,
      racePace,
      startDate,
      warmUpDistance: nextWarmUpDistance
    });
  };

  useEffect(() => {
    const settings = retrieveSettings();
    if (settings) {
      setCompletedTrainings(settings.completedTrainings);
      setDistanceUnits(settings.distanceUnits);
      setRacePace(settings.racePace);
      setStartDate(settings.startDate);
      setWarmUpDistance(settings.warmUpDistance);

      setPlan(
        getDetailedPlan(
          settings.warmUpDistance,
          settings.racePace,
          settings.completedTrainings,
          settings.startDate
        )
      );
    }
  }, []);

  return (
    <div>
      <h1>Marathon planner</h1>

      <SettingsComponent
        distanceUnits={distanceUnits}
        racePace={racePace}
        setDistanceUnits={distanceUnitsChange}
        setRacePace={racePaceChange}
        setStartDate={startDateChange}
        setWarmUpDistance={warmUpDistanceChange}
        startDate={startDate}
        warmUpDistance={warmUpDistance}
      />

      <Plan isDesktop={isDesktop} plan={plan} toggleTrainingCompleted={trainingCompletedChange} />

      <Legend />

      <StatsComponent plan={plan} />
    </div>
  );
};

const appPlaceholder = document.getElementById('app-placeholder');
ReactDOM.render(<App />, appPlaceholder);
