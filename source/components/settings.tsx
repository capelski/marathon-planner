import React, { useEffect, useState } from 'react';
import {
  convertDistance,
  createDistance,
  dateToString,
  extractPaceMinutes,
  extractPaceSeconds,
  getDisplayDistance,
  getPace,
  stringToDate
} from '../logic';
import { DistanceUnits, warmUpDistances } from '../models';
import { Distance, Pace } from '../types';
import { RadioButtons } from './radio-buttons';

export interface SettingsProps {
  distanceUnits: DistanceUnits;
  racePace: Pace;
  setDistanceUnits: (distanceUnits: DistanceUnits) => void;
  setRacePace: (racePace: Pace) => void;
  setStartDate: (startDate: Date | undefined) => void;
  setWarmUpDistance: (warmUpDistance: Distance) => void;
  startDate: Date | undefined;
  warmUpDistance: Distance;
}

export const Settings: React.FC<SettingsProps> = (props) => {
  const [minutes, setMinutes] = useState(String(extractPaceMinutes(props.racePace)));
  const [seconds, setSeconds] = useState(String(extractPaceSeconds(props.racePace)));

  useEffect(() => {
    setMinutes(String(extractPaceMinutes(props.racePace) || ''));
    setSeconds(String(extractPaceSeconds(props.racePace) || ''));
  }, [props.racePace]);

  const distanceUnitsChange = (nextValue: string) => {
    props.setDistanceUnits(nextValue as DistanceUnits);
  };

  const timeChange = (_minutes: string, _seconds: string) => {
    const nextPace = getPace(props.distanceUnits, parseInt(_minutes) || 0, parseInt(_seconds) || 0);
    setMinutes(String(extractPaceMinutes(nextPace) || ''));
    setSeconds(String(extractPaceSeconds(nextPace) || ''));
    props.setRacePace(nextPace);
  };

  const warmUpDistanceChange = (_warmUpDistance: string) => {
    const nextWarmUpDistance = createDistance(
      parseFloat(_warmUpDistance),
      props.warmUpDistance.distanceUnits
    );
    props.setWarmUpDistance(nextWarmUpDistance);
  };

  return (
    <React.Fragment>
      <h2>Settings</h2>
      <RadioButtons
        label="Distance units"
        name="distanceUnits"
        onChange={distanceUnitsChange}
        options={[{ value: DistanceUnits.kilometers }, { value: DistanceUnits.miles }]}
        style={{ marginBottom: 8 }}
        value={props.distanceUnits}
      />
      <RadioButtons
        label="Warm up/Cool down distance"
        name="warmUpDistance"
        onChange={warmUpDistanceChange}
        options={warmUpDistances.map((distance) => ({
          label: getDisplayDistance(convertDistance(distance, props.distanceUnits)),
          value: String(distance.value)
        }))}
        style={{ marginBottom: 8 }}
        value={String(props.warmUpDistance.value)}
      />
      <div style={{ marginBottom: 8 }}>
        Race pace: <br />
        <div style={{ display: 'inline-block', marginLeft: 4, marginTop: 4 }}>
          <input
            onChange={(event) => timeChange(event.target.value, seconds)}
            type="number"
            style={{ width: 50 }}
            value={minutes}
          />
          {" ' "}
          <input
            onChange={(event) => timeChange(minutes, event.target.value)}
            type="number"
            style={{ width: 50 }}
            value={seconds}
          />
          {' " / '}
          {props.distanceUnits}
        </div>
      </div>
      <div style={{ marginBottom: 8 }}>
        Start date: <br />
        <input
          onChange={(event) => {
            props.setStartDate(stringToDate(event.target.value));
          }}
          style={{ marginLeft: 4, marginTop: 4 }}
          type="date"
          value={dateToString(props.startDate)}
        />
      </div>
    </React.Fragment>
  );
};
