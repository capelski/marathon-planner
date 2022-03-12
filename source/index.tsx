import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useMediaQuery } from 'react-responsive';
import { Legend, Settings, Plan } from './components';
import { getFullPlan } from './logic';
import { DistanceUnits, warmUpDistances } from './models';

const App: React.FC = () => {
  const [distanceUnits, setDistanceUnits] = useState<DistanceUnits>(DistanceUnits.kilometers);
  const [plan, setPlan] = useState(getFullPlan(warmUpDistances[0]));
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
