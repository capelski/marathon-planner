import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useMediaQuery } from 'react-responsive';
import { Legend, Settings, Plan } from './components';
import { defaultDistanceUnits, defaultPace, defaultWarmUpDistance } from './constants';
import { getFullPlan } from './logic';
import { DistanceUnits } from './models';

const App: React.FC = () => {
  const [distanceUnits, setDistanceUnits] = useState<DistanceUnits>(defaultDistanceUnits);
  const [plan, setPlan] = useState(getFullPlan(defaultWarmUpDistance, defaultPace));
  const isDesktop = useMediaQuery({ minWidth: 768 });

  return (
    <div>
      <h1>Marathon planner</h1>

      <Plan distanceUnits={distanceUnits} isDesktop={isDesktop} plan={plan} />

      <Legend isDesktop={isDesktop} />

      <Settings
        distanceUnits={distanceUnits}
        setDistanceUnits={setDistanceUnits}
        setPlan={setPlan}
      />
    </div>
  );
};

const appPlaceholder = document.getElementById('app-placeholder');
ReactDOM.render(<App />, appPlaceholder);
