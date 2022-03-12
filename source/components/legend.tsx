import React from 'react';
import {
  trainingCoreSymbol,
  warmUpSymbol,
  coolDownSymbol,
  recoveryIntervalSymbol,
  totalDistanceSymbol
} from '../constants';
import { sortedTrainingTypes, trainingTypeColors } from '../models';

export interface LegendProps {
  isDesktop: boolean;
}

export const Legend: React.FC<LegendProps> = (props) => {
  return (
    <React.Fragment>
      <h2>Legend</h2>
      {sortedTrainingTypes.map((trainingType) => {
        return (
          <div
            key={trainingType}
            style={{ alignItems: 'center', display: 'flex', marginBottom: 4 }}
          >
            <span
              style={{
                backgroundColor: trainingTypeColors[trainingType],
                display: 'inline-block',
                height: props.isDesktop ? 16 : 24,
                marginRight: 8,
                width: props.isDesktop ? 'calc(14.28% / 2 - 4px)' : 40
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
