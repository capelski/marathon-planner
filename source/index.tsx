import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { getFullPlan } from './logic/plan';
import { sortedTrainingTypes, trainingTypeColors } from './logic/training-type';
import { DistanceUnits, FullTraining, TrainingType } from './types';

const coolDownSymbol = '↘️';
const recoveryIntervalSymbol = '🔄';
const trainingCoreSymbol = '▶️';
const warmUpSymbol = '↗️';

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
            <div className="week" style={{ display: 'flex', flexDirection: 'column' }}>
              {week.trainings.map((training) => {
                return (
                  <div
                    className="day"
                    style={{ alignItems: 'center', display: 'flex', flexDirection: 'row' }}
                  >
                    <div
                      style={{
                        backgroundColor: trainingTypeColors[training.type],
                        height: 24,
                        marginBottom: 4,
                        width: 48
                      }}
                    />
                    {(training.type === TrainingType.speed ||
                      training.type === TrainingType.strength ||
                      training.type === TrainingType.timed) && (
                      <div style={{ marginLeft: 8 }}>
                        {warmUpSymbol} {getDisplayDistance(training.warmUpDistance, distanceUnits)}
                      </div>
                    )}
                    {(training.type === TrainingType.moderate ||
                      training.type === TrainingType.race ||
                      training.type === TrainingType.recovery ||
                      training.type === TrainingType.timed) && (
                      <div style={{ marginLeft: 8 }}>
                        {trainingCoreSymbol} {getDisplayDistance(training.distance, distanceUnits)}
                      </div>
                    )}
                    {(training.type === TrainingType.speed ||
                      training.type === TrainingType.strength) && (
                      <React.Fragment>
                        <div style={{ marginLeft: 8 }}>
                          {trainingCoreSymbol} {training.intervalsNumber}x
                          {getDisplayDistance(training.intervalDistance, distanceUnits)}
                        </div>
                        <div style={{ marginLeft: 8 }}>
                          {recoveryIntervalSymbol}{' '}
                          {getDisplayDistance(training.intervalRecovery, distanceUnits)}
                        </div>
                      </React.Fragment>
                    )}
                    {(training.type === TrainingType.speed ||
                      training.type === TrainingType.strength ||
                      training.type === TrainingType.timed) && (
                      <div style={{ marginLeft: 8 }}>
                        {coolDownSymbol}{' '}
                        {getDisplayDistance(training.warmUpDistance, distanceUnits)}
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
          <div style={{ alignItems: 'center', display: 'flex', marginBottom: 4 }}>
            <span
              style={{
                backgroundColor: trainingTypeColors[trainingType],
                display: 'inline-block',
                height: 24,
                marginRight: 8,
                width: 48
              }}
            />{' '}
            {trainingType}
          </div>
        );
      })}
      <br />
      <div>{trainingCoreSymbol} Training core</div>
      <div>{warmUpSymbol} Warm up</div>
      <div>{coolDownSymbol} Cool down</div>
      <div>{recoveryIntervalSymbol} Recovery interval</div>

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
