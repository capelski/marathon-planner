import React from 'react';
import { paceSymbol } from '../constants';
import { extractPaceMinutes, extractPaceSeconds } from '../logic';

interface PaceComponentProps {
  seconds: number;
}

export const PaceComponent: React.FC<PaceComponentProps> = (props) => {
  return (
    <span style={{ paddingRight: 4 }}>
      {paceSymbol} {extractPaceMinutes(props.seconds)}' {extractPaceSeconds(props.seconds)}"
    </span>
  );
};
