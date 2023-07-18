import React from 'react';
import { totalDistanceSymbol } from '../constants';
import { addDays, dateToIsoString, getDisplayWeekDays } from '../logic';
import { DetailedWeek } from '../types';
import { DistanceComponent } from './distance';
import { Training } from './training';

export interface WeekProps {
  isCollapsed?: boolean;
  isDesktop: boolean;
  toggleIsCollapsed: () => void;
  toggleSkippedWeek: (weekNumber: number) => void;
  toggleTrainingCompleted: (weekNumber: number, trainingNumber: number) => void;
  week: DetailedWeek;
}

export const Week: React.FC<WeekProps> = (props) => {
  const weekDays =
    props.week.startDate &&
    getDisplayWeekDays(props.week.startDate).map((wd) =>
      props.isDesktop ? wd : wd.substring(0, 2)
    );

  const now = new Date();
  const isActiveWeek =
    props.week.startDate && props.week.startDate < now && addDays(props.week.startDate, 7) > now;

  return (
    <div>
      <div
        onClick={props.toggleIsCollapsed}
        style={{
          alignItems: 'center',
          backgroundColor: isActiveWeek ? 'rgba(254, 166, 7, 0.25)' : undefined,
          cursor: 'pointer',
          display: 'flex'
        }}
      >
        <h4 style={{ flexGrow: 1, marginBottom: 8, marginTop: 8 }}>
          <span>{props.isCollapsed ? '☞' : '☟'}</span> Week {props.week.number}
          {props.week.startDate && (
            <span style={{ fontWeight: 'normal' }}> - {dateToIsoString(props.week.startDate)}</span>
          )}
          {props.week.isSkipped && (
            <span style={{ fontWeight: 'normal', opacity: 0.75 }}> ⛔️</span>
          )}
        </h4>
        <DistanceComponent distance={props.week.total.distance} symbol={totalDistanceSymbol} />
      </div>
      {!props.isCollapsed && (
        <div style={{ paddingTop: 8, paddingLeft: 20 }}>
          <div
            className="week"
            style={{
              display: 'flex',
              flexDirection: props.isDesktop ? 'row' : 'column'
            }}
          >
            {props.week.trainings.map((training, index) => {
              return (
                <Training
                  isDesktop={props.isDesktop}
                  key={index}
                  toggleTrainingCompleted={(trainingNumber) => {
                    props.toggleTrainingCompleted(props.week.number, trainingNumber);
                  }}
                  training={training}
                  weekDay={weekDays && weekDays[index]}
                />
              );
            })}
          </div>
          {props.week.number !== 18 && (
            <div style={{ marginBottom: 8, marginTop: 8 }}>
              <button onClick={() => props.toggleSkippedWeek(props.week.number)}>
                {props.week.isSkipped ? 'Enable' : 'Skip'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
