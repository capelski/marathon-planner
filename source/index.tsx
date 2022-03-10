import React from 'react';
import ReactDOM from 'react-dom';
import { plan } from './plan';
import { TrainingType } from './types';

const App: React.FC = () => {
  return (
    <div>
      <h1>Marathon planner</h1>
      {plan.map((week) => {
        return (
          <div>
            <h3>Week {week.number}</h3>
            <div className="week" style={{ display: 'flex' }}>
              {week.trainings.map((training) => {
                return (
                  <div className="day" style={{ textAlign: 'center', width: '14.28%' }}>
                    <div>{training.type}</div>
                    {(training.type === TrainingType.comfortable ||
                      training.type === TrainingType.recovery ||
                      training.type === TrainingType.timed) && <div>{training.distance} miles</div>}
                    {(training.type === TrainingType.speed ||
                      training.type === TrainingType.strength) && (
                      <div>
                        <div>
                          {training.intervalsNumber}x {training.intervalDistance} miles
                        </div>
                        <div>Recovery: {training.intervalRecovery} miles</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const appPlaceholder = document.getElementById('app-placeholder');
ReactDOM.render(<App />, appPlaceholder);
