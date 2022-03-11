import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { getFullPlan } from './logic/plan';
import { sortedTrainingTypes, trainingTypeColors } from './logic/training-type';
import { DistanceUnits, FullTraining, TrainingType } from './types';

const getTrainingDistance = (training: FullTraining) =>
  training.type === TrainingType.moderate ||
  training.type === TrainingType.race ||
  training.type === TrainingType.recovery
    ? training.distance
    : training.type === TrainingType.timed
    ? training.distance + training.warmUpDistance * 2
    : training.type === TrainingType.speed || training.type === TrainingType.strength
    ? training.intervalDistance * training.intervalsNumber +
      training.intervalRecovery * (training.intervalsNumber - 1) +
      training.warmUpDistance * 2
    : 0;

const getDisplayDistance = (distance: number, distanceUnits: DistanceUnits) =>
  distanceUnits === DistanceUnits.kilometers
    ? `${Math.round(distance * 16.09) / 10} ${DistanceUnits.kilometers}`
    : `${distance} ${DistanceUnits.miles}`;

const App: React.FC = () => {
  const [distanceUnits, setDistanceUnits] = useState<DistanceUnits>(DistanceUnits.kilometers);
  const [plan] = useState(getFullPlan(1.5));

  return (
    <div>
      <h1>Marathon planner</h1>

      <h2>Plan</h2>
      {plan.map((week) => {
        return (
          <div>
            <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
              <h4>Week {week.number}</h4>
              <div>
                👟{' '}
                {getDisplayDistance(
                  week.trainings.reduce((x, y) => x + getTrainingDistance(y), 0),
                  distanceUnits
                )}
              </div>
            </div>
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
                    {(training.type === TrainingType.moderate ||
                      training.type === TrainingType.race ||
                      training.type === TrainingType.recovery ||
                      training.type === TrainingType.timed) && (
                      <div>{getDisplayDistance(training.distance, distanceUnits)}</div>
                    )}
                    {(training.type === TrainingType.speed ||
                      training.type === TrainingType.strength) && (
                      <div>
                        <div>
                          {training.intervalsNumber}x
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
      {sortedTrainingTypes.map((trainingType) => {
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
      <br />
      <div>🔄 Recovery</div>

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
