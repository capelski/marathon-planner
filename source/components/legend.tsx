import React from 'react';
import {
  trainingCoreSymbol,
  warmUpSymbol,
  coolDownSymbol,
  recoveryIntervalSymbol,
  totalDistanceSymbol
} from '../constants';
import { sortedTrainingTypes, trainingTypeColors } from '../models';

export const Legend: React.FC = () => {
  return (
    <React.Fragment>
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
      <div>{totalDistanceSymbol} Total distance</div>
    </React.Fragment>
  );
};
