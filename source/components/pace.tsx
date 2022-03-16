import React from 'react';
import { paceSymbol } from '../constants';
import { extractPaceMinutes, extractPaceSeconds } from '../logic';
import { Pace } from '../types';

interface PaceComponentProps {
  pace: Pace;
}

export const PaceComponent: React.FC<PaceComponentProps> = (props) => {
  return (
    <span style={{ paddingLeft: 4 }}>
      {paceSymbol} {extractPaceMinutes(props.pace)}' {extractPaceSeconds(props.pace)}"
    </span>
  );
};
