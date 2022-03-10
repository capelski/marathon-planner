import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { plan } from './plan';
import { DistanceUnits, TrainingType } from './types';

const getDisplayDistance = (distance: number, distanceUnits: DistanceUnits) =>
  distanceUnits === DistanceUnits.kilometers
    ? `${Math.round(distance * 16.09) / 10} ${DistanceUnits.kilometers}`
    : `${distance} ${DistanceUnits.miles}`;

const App: React.FC = () => {
  const [distanceUnits, setDistanceUnits] = useState<DistanceUnits>(DistanceUnits.kilometers);

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
                      training.type === TrainingType.timed) && (
                      <div>{getDisplayDistance(training.distance, distanceUnits)}</div>
                    )}
                    {(training.type === TrainingType.speed ||
                      training.type === TrainingType.strength) && (
                      <div>
                        <div>
                          {training.intervalsNumber}x{' '}
                          {getDisplayDistance(training.intervalDistance, distanceUnits)}
                        </div>
                        <div>
                          Recovery: {getDisplayDistance(training.intervalRecovery, distanceUnits)}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <h2>Settings</h2>
      <div>
        Distance units:{' '}
        <input
          checked={distanceUnits === DistanceUnits.kilometers}
          name="distanceUnits"
          onChange={(event) => setDistanceUnits(event.target.value as DistanceUnits)}
          type="radio"
          value={DistanceUnits.kilometers}
        />{' '}
        {DistanceUnits.kilometers}
        <input
          checked={distanceUnits === DistanceUnits.miles}
          name="distanceUnits"
          onChange={(event) => setDistanceUnits(event.target.value as DistanceUnits)}
          type="radio"
          value={DistanceUnits.miles}
        />{' '}
        {DistanceUnits.miles}
      </div>
    </div>
  );
};

const appPlaceholder = document.getElementById('app-placeholder');
ReactDOM.render(<App />, appPlaceholder);
