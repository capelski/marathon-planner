import React from 'react';
import { timeSymbol } from '../constants';

interface TimeProps {
  seconds: number;
}

export const Time: React.FC<TimeProps> = (props) => {
  const hours = Math.floor(props.seconds / 3600);
  const minutes = Math.floor((props.seconds - hours * 3600) / 60);

  return (
    <span style={{ paddingLeft: 4 }}>
      {timeSymbol} {hours > 0 ? hours + 'h' : undefined} {minutes}'
    </span>
  );
};
