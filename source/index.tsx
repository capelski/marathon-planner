import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useMediaQuery } from 'react-responsive';
import { Legend, Settings, Plan, StatsComponent } from './components';
import {
  defaultCompletedTrainings,
  defaultDistanceUnits,
  defaultRacePace,
  defaultWarmUpDistance
} from './constants';
import {
  convertPace,
  getDetailedPlan,
  retrieveCompletedTrainings,
  toggleTrainingCompleted
} from './logic';
import { DistanceUnits } from './models';
import { Distance, Pace } from './types';

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
    setDistanceUnits(nextDistanceUnits);
    const nextPace = convertPace(racePace, nextDistanceUnits);
    racePaceChange(nextPace);
  };

  const racePaceChange = (nextRacePace: Pace) => {
    setRacePace(nextRacePace);
    setPlan(getDetailedPlan(warmUpDistance, nextRacePace, completedTrainings, startDate));
  };

  const startDateChange = (nextStartDate: Date | undefined) => {
    setStartDate(nextStartDate);
    setPlan(getDetailedPlan(warmUpDistance, racePace, completedTrainings, nextStartDate));
  };

  const trainingCompletedChange = (weekNumber: number, trainingNumber: number) => {
    const nextCompletedTrainings = toggleTrainingCompleted(
      completedTrainings,
      weekNumber,
      trainingNumber
    );
    setCompletedTrainings(nextCompletedTrainings);
    setPlan(getDetailedPlan(warmUpDistance, racePace, nextCompletedTrainings, startDate));
  };

  const warmUpDistanceChange = (nextWarmUpDistance: Distance) => {
    setWarmUpDistance(nextWarmUpDistance);
    setPlan(getDetailedPlan(nextWarmUpDistance, racePace, completedTrainings, startDate));
  };

  useEffect(() => {
    const nextCompletedTrainings = retrieveCompletedTrainings();
    if (nextCompletedTrainings) {
      setCompletedTrainings(nextCompletedTrainings);
      setPlan(getDetailedPlan(warmUpDistance, racePace, nextCompletedTrainings, startDate));
    }
  }, []);

  return (
    <div>
      <h1>Marathon planner</h1>

      <Settings
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
