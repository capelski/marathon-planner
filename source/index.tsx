import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { plan } from './plan';
import { DistanceUnits, TrainingType } from './types';

const racePaceColor = '#a2d11c';

const trainingTypeColors = {
  [TrainingType.speed]: '#fd600e',
  [TrainingType.strength]: '#fea607',
  [TrainingType.timed]: racePaceColor,
  [TrainingType.race]: racePaceColor,
  [TrainingType.comfortable]: '#4b944c',
  [TrainingType.recovery]: '#15546b',
  [TrainingType.rest]: 'lightgrey'
};

const getDisplayDistance = (distance: number, distanceUnits: DistanceUnits) =>
  distanceUnits === DistanceUnits.kilometers
    ? `${Math.round(distance * 16.09) / 10} ${DistanceUnits.kilometers}`
    : `${distance} ${DistanceUnits.miles}`;

const App: React.FC = () => {
  const [distanceUnits, setDistanceUnits] = useState<DistanceUnits>(DistanceUnits.kilometers);

  return (
    <div>
      <h1>Marathon planner</h1>

      <h2>Plan</h2>
      {plan.map((week) => {
        return (
          <div>
            <h4>Week {week.number}</h4>
            <div className="week" style={{ display: 'flex' }}>
              {week.trainings.map((training) => {
                return (
                  <div className="day" style={{ textAlign: 'center', width: '14.28%' }}>
                    <div
                      style={{
                        backgroundColor: trainingTypeColors[training.type],
                        height: 10,
                        marginLeft: 2
                      }}
                    />
                    {(training.type === TrainingType.comfortable ||
                      training.type === TrainingType.race ||
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
                        <div>🔄 {getDisplayDistance(training.intervalRecovery, distanceUnits)}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <h2>Legend</h2>
      {Object.values(TrainingType).map((trainingType) => {
        return (
          <div>
            <span
              style={{
                backgroundColor: trainingTypeColors[trainingType],
                display: 'inline-block',
                height: 16,
                width: 16
              }}
            />{' '}
            {trainingType}
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
