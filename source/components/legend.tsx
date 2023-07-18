import React from 'react';
import {
  coolDownSymbol,
  paceSymbol,
  recoveryIntervalSymbol,
  timeSymbol,
  totalDistanceSymbol,
  trainingCoreSymbol,
  warmUpSymbol
} from '../constants';
import { getTrainingPaces } from '../logic';
import { TrainingType, sortedTrainingTypes, trainingTypeColors } from '../models';
import { BaseSettings } from '../types';
import { PaceComponent } from './pace';

export interface LegendProps {
  baseSettings: BaseSettings;
}

export const Legend: React.FC<LegendProps> = (props) => {
  const trainingPaces = getTrainingPaces(props.baseSettings.racePace);

  return (
    <React.Fragment>
      <h2>Legend</h2>
      {sortedTrainingTypes
        .filter(
          (trainingType) =>
            trainingType !== TrainingType.recovery || !props.baseSettings.skipRecovery
        )
        .map((trainingType) => {
          return (
            <div
              key={trainingType}
              style={{ alignItems: 'center', display: 'flex', marginBottom: 4 }}
            >
              <span
                style={{
                  backgroundColor: trainingTypeColors[trainingType].backgroundColor,
                  display: 'inline-block',
                  height: 24,
                  marginRight: 8,
                  width: 24
                }}
              />{' '}
              {trainingType}
              {trainingType !== TrainingType.rest && (
                <React.Fragment>
                  &nbsp;-&nbsp;
                  <PaceComponent pace={trainingPaces[trainingType]} />
                </React.Fragment>
              )}
            </div>
          );
        })}
      <br />
      <div>{trainingCoreSymbol} Training core</div>
      <div>{warmUpSymbol} Warm up</div>
      <div>{coolDownSymbol} Cool down</div>
      <div>{recoveryIntervalSymbol} Recovery interval</div>
      <div>{paceSymbol} Pace</div>
      <div>{totalDistanceSymbol} Total distance</div>
      <div>{timeSymbol} Total time</div>
    </React.Fragment>
  );
};
