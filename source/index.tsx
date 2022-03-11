import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { RadioButtons } from './components/radio-buttons';
import { getDisplayDistance } from './logic/distance-units';
import { getFullPlan } from './logic/plan';
import { sortedTrainingTypes, trainingTypeColors } from './logic/training-type';
import { warmUpDistances } from './logic/warm-up-distances';
import { getWeekDistance } from './logic/week';
import { DistanceUnits, TrainingType } from './types';

const coolDownSymbol = '↘️';
const recoveryIntervalSymbol = '🔄';
const trainingCoreSymbol = '▶️';
const warmUpSymbol = '↗️';

const App: React.FC = () => {
  const [distanceUnits, setDistanceUnits] = useState<DistanceUnits>(DistanceUnits.kilometers);
  const [warmUpDistance, setWarmUpDistance] = useState(warmUpDistances[0]);
  const [plan, setPlan] = useState(getFullPlan(warmUpDistances[0]));

  return (
    <div>
      <h1>Marathon planner</h1>

      <h2>Plan</h2>
      {plan.map((week) => {
        return (
          <div>
            <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
              <h4>Week {week.number}</h4>
              <div>👟 {getDisplayDistance(getWeekDistance(week), distanceUnits)}</div>
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
                          {trainingCoreSymbol} {training.intervalsNumber}x(
                          {getDisplayDistance(training.intervalDistance, distanceUnits)}
                          {' - '}
                          {recoveryIntervalSymbol}{' '}
                          {getDisplayDistance(training.intervalRecovery, distanceUnits)})
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
      <RadioButtons
        label="Distance units"
        name="distanceUnits"
        onChange={(nextValue) => setDistanceUnits(nextValue as DistanceUnits)}
        options={[{ value: DistanceUnits.kilometers }, { value: DistanceUnits.miles }]}
        value={distanceUnits}
      />
      <RadioButtons
        label="Warm up/Cool down distance"
        name="warmUpDistance"
        onChange={(nextValue) => {
          const nextWarmUpDistance = parseFloat(nextValue);
          setWarmUpDistance(nextWarmUpDistance);
          setPlan(getFullPlan(nextWarmUpDistance));
        }}
        options={warmUpDistances.map((d) => ({
          label: getDisplayDistance(d, distanceUnits),
          value: String(d)
        }))}
        value={String(warmUpDistance)}
      />
    </div>
  );
};

const appPlaceholder = document.getElementById('app-placeholder');
ReactDOM.render(<App />, appPlaceholder);
