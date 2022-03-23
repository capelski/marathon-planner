import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useMediaQuery } from 'react-responsive';
import { Legend, Settings, Plan, Stats } from './components';
import { defaultDistanceUnits, defaultRacePace, defaultWarmUpDistance } from './constants';
import { convertPace, getDetailedPlan } from './logic';
import { DistanceUnits } from './models';
import { Distance, Pace } from './types';

const App: React.FC = () => {
  const [distanceUnits, setDistanceUnits] = useState<DistanceUnits>(defaultDistanceUnits);
  const [plan, setPlan] = useState(getDetailedPlan(defaultWarmUpDistance, defaultRacePace));
  const [racePace, setRacePace] = useState(defaultRacePace);
  const [warmUpDistance, setWarmUpDistance] = useState(defaultWarmUpDistance);

  const isDesktop = useMediaQuery({ minWidth: 768 });

  const distanceUnitsChange = (nextDistanceUnits: DistanceUnits) => {
    setDistanceUnits(nextDistanceUnits);
    const nextPace = convertPace(racePace, nextDistanceUnits);
    racePaceChange(nextPace);
  };

  const racePaceChange = (nextRacePace: Pace) => {
    setRacePace(nextRacePace);
    setPlan(getDetailedPlan(warmUpDistance, nextRacePace));
  };

  const warmUpDistanceChange = (nextWarmUpDistance: Distance) => {
    setWarmUpDistance(nextWarmUpDistance);
    setPlan(getDetailedPlan(nextWarmUpDistance, racePace));
  };

  return (
    <div>
      <h1>Marathon planner</h1>

      <Plan isDesktop={isDesktop} plan={plan} />

      <Legend />

      <Settings
        distanceUnits={distanceUnits}
        racePace={racePace}
        setDistanceUnits={distanceUnitsChange}
        setRacePace={racePaceChange}
        setWarmUpDistance={warmUpDistanceChange}
        warmUpDistance={warmUpDistance}
      />

      <Stats plan={plan} />
    </div>
  );
};

const appPlaceholder = document.getElementById('app-placeholder');
ReactDOM.render(<App />, appPlaceholder);
