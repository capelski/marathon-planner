import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useMediaQuery } from 'react-responsive';
import { Legend, Settings, Plan } from './components';
import { defaultRacePace, defaultWarmUpDistance } from './constants';
import { getDetailedPlan } from './logic';

const App: React.FC = () => {
  const [plan, setPlan] = useState(getDetailedPlan(defaultWarmUpDistance, defaultRacePace));
  const isDesktop = useMediaQuery({ minWidth: 768 });

  return (
    <div>
      <h1>Marathon planner</h1>

      <Plan isDesktop={isDesktop} plan={plan} />

      <Legend />

      <Settings setPlan={setPlan} />
    </div>
  );
};

const appPlaceholder = document.getElementById('app-placeholder');
ReactDOM.render(<App />, appPlaceholder);
