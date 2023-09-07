import React, { useState } from 'react';
import menuImage from '../../static/images/menu.png';
import { currentColor, totalDistanceSymbol } from '../constants';
import { addDays, dateToIsoString, getDisplayWeekDays } from '../logic';
import { TrainingType } from '../models';
import { DetailedWeek } from '../types';
import { DistanceComponent } from './distance';
import { Inliner } from './inliner';
import { Modal } from './modal';
import { Training } from './training';

export interface WeekProps {
  isDesktop: boolean;
  isExpanded?: boolean;
  toggleExpandedWeek: () => void;
  toggleSkippedWeek: (weekNumber: number) => void;
  toggleTrainingCompleted: (weekNumber: number, trainingNumber: number) => void;
  week: DetailedWeek;
}

export const Week: React.FC<WeekProps> = (props) => {
  const [displayWeekMenu, setDisplayWeekMenu] = useState(false);

  const weekDays =
    props.week.startDate &&
    getDisplayWeekDays(props.week.startDate).map((wd) =>
      props.isDesktop ? wd : wd.substring(0, 2)
    );

  const now = new Date();
  const isCurrentWeek =
    !props.isExpanded &&
    props.week.startDate &&
    props.week.startDate < now &&
    addDays(props.week.startDate, 7) > now;

  const isMarathonWeek = props.week.trainings.some((t) => t.type === TrainingType.marathon);

  return (
    <div>
      <div
        onClick={props.toggleExpandedWeek}
        style={{
          alignItems: 'center',
          backgroundColor: isCurrentWeek ? currentColor : undefined,
          cursor: 'pointer',
          display: 'flex'
        }}
      >
        <h4 style={{ flexGrow: 1, marginBottom: 8, marginTop: 8 }}>
          <span>{props.isExpanded ? '☟' : '☞'}</span> Week {props.week.number}
          {props.week.startDate && (
            <span style={{ fontWeight: 'normal' }}> - {dateToIsoString(props.week.startDate)}</span>
          )}
          {props.week.isSkipped && (
            <span style={{ fontWeight: 'normal', opacity: 0.75 }}> ⛔️</span>
          )}
        </h4>
        <Inliner>
          {!isMarathonWeek && (
            <React.Fragment>
              <img
                onClick={(event) => {
                  event.stopPropagation();
                  setDisplayWeekMenu(true);
                }}
                height={20}
                src={menuImage}
                style={{ marginRight: 8 }}
                width={20}
              />
              {displayWeekMenu && (
                <Modal closeHandler={() => setDisplayWeekMenu(false)}>
                  <button
                    onClick={() => {
                      setDisplayWeekMenu(false);
                      props.toggleSkippedWeek(props.week.number);
                    }}
                    style={{ minWidth: '150px' }}
                  >
                    {props.week.isSkipped ? '✅ Enable' : '❌ Skip'}
                  </button>
                </Modal>
              )}
            </React.Fragment>
          )}
          <DistanceComponent distance={props.week.total.distance} symbol={totalDistanceSymbol} />
        </Inliner>
      </div>
      {props.isExpanded && (
        <div style={{ paddingLeft: 20 }}>
          <div
            className="week"
            style={{
              display: 'flex',
              flexDirection: props.isDesktop ? 'row' : 'column'
            }}
          >
            {props.week.trainings.map((training, index) => {
              const isCurrentTraining =
                props.week.startDate &&
                addDays(props.week.startDate, index) < now &&
                addDays(props.week.startDate, index + 1) > now;

              return (
                <Training
                  isCurrentTraining={isCurrentTraining}
                  isDesktop={props.isDesktop}
                  isSkippedWeek={props.week.isSkipped}
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
        </div>
      )}
    </div>
  );
};
