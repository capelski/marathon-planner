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
import { Inliner } from './inliner';
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
                  <PaceComponent seconds={trainingPaces[trainingType].seconds} />
                </React.Fragment>
              )}
            </div>
          );
        })}
      <br />
      <Inliner style={{ marginBottom: 16 }}>
        <span style={{ paddingRight: 8 }}>{trainingCoreSymbol} Training core</span>
        <span style={{ paddingRight: 8 }}>{warmUpSymbol} Warm up</span>
        <span style={{ paddingRight: 8 }}>{coolDownSymbol} Cool down</span>
        <span style={{ paddingRight: 8 }}>{recoveryIntervalSymbol} Recovery interval</span>
        <span style={{ paddingRight: 8 }}>{paceSymbol} Pace</span>
        <span style={{ paddingRight: 8 }}>{totalDistanceSymbol} Total distance</span>
        <span style={{ paddingRight: 8 }}>{timeSymbol} Total time</span>
      </Inliner>
    </React.Fragment>
  );
};
