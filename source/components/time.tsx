import React from 'react';
import { timeSymbol } from '../constants';

interface TimeProps {
  seconds: number;
}

export const Time: React.FC<TimeProps> = (props) => {
  const hours = Math.floor(props.seconds / 3600);
  const hoursRemainder = props.seconds - hours * 3600;
  const minutes = Math.floor(hoursRemainder / 60);
  const minutesReminder = hoursRemainder - minutes * 60;
  const seconds = Math.floor(minutesReminder);

  return (
    <span style={{ paddingLeft: 4 }}>
      {timeSymbol} {hours > 0 ? `${hours}h ` : undefined}
      {minutes}'{hours === 0 && seconds > 0 ? ` ${seconds}"` : undefined}
    </span>
  );
};
