import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useMediaQuery } from 'react-responsive';
import { Distance, RadioButtons, getDisplayDistance } from './components';
import { getFullPlan, getWeekDistance } from './logic';
import {
  DistanceUnits,
  warmUpDistances,
  trainingTypeColors,
  TrainingType,
  sortedTrainingTypes
} from './models';

const coolDownSymbol = '↘️';
const recoveryIntervalSymbol = '🔄';
const trainingCoreSymbol = '▶️';
const warmUpSymbol = '↗️';

const App: React.FC = () => {
  const [distanceUnits, setDistanceUnits] = useState<DistanceUnits>(DistanceUnits.kilometers);
  const [warmUpDistance, setWarmUpDistance] = useState(warmUpDistances[0]);
  const [plan, setPlan] = useState(getFullPlan(warmUpDistances[0]));
  const isDesktop = useMediaQuery({ minWidth: 768 });

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
                <Distance
                  displayUnits={true}
                  distance={getWeekDistance(week)}
                  distanceUnits={distanceUnits}
                />
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
                        {warmUpSymbol}{' '}
                        <Distance
                          displayUnits={isDesktop}
                          distance={training.warmUpDistance}
                          distanceUnits={distanceUnits}
                        />
                      </div>
                    )}
                    {(training.type === TrainingType.moderate ||
                      training.type === TrainingType.race ||
                      training.type === TrainingType.recovery ||
                      training.type === TrainingType.timed) && (
                      <div style={{ marginLeft: 8 }}>
                        {trainingCoreSymbol}{' '}
                        <Distance
                          displayUnits={isDesktop}
                          distance={training.distance}
                          distanceUnits={distanceUnits}
                        />
                      </div>
                    )}
                    {(training.type === TrainingType.speed ||
                      training.type === TrainingType.strength) && (
                      <React.Fragment>
                        <div style={{ marginLeft: 8 }}>
                          {training.intervalsNumber}x(
                          {trainingCoreSymbol}{' '}
                          <Distance
                            displayUnits={isDesktop}
                            distance={training.intervalDistance}
                            distanceUnits={distanceUnits}
                          />
                          {' - '}
                          {recoveryIntervalSymbol}{' '}
                          <Distance
                            displayUnits={isDesktop}
                            distance={training.intervalRecovery}
                            distanceUnits={distanceUnits}
                          />
                          )
                        </div>
                      </React.Fragment>
                    )}
                    {(training.type === TrainingType.speed ||
                      training.type === TrainingType.strength ||
                      training.type === TrainingType.timed) && (
                      <div style={{ marginLeft: 8 }}>
                        {coolDownSymbol}{' '}
                        <Distance
                          displayUnits={isDesktop}
                          distance={training.warmUpDistance}
                          distanceUnits={distanceUnits}
                        />
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
          label: getDisplayDistance(d, distanceUnits, isDesktop),
          value: String(d)
        }))}
        value={String(warmUpDistance)}
      />
    </div>
  );
};

const appPlaceholder = document.getElementById('app-placeholder');
ReactDOM.render(<App />, appPlaceholder);
