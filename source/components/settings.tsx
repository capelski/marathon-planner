import React, { useState } from 'react';
import { defaultPace, defaultWarmUpDistance } from '../constants';
import {
  convertPace,
  extractPaceMinutes,
  extractPaceSeconds,
  getFullPlan,
  getPace
} from '../logic';
import { DistanceUnits, warmUpDistances } from '../models';
import { FullPlan, Pace } from '../types';
import { getDisplayDistance } from './distance';
import { RadioButtons } from './radio-buttons';

export interface SettingsProps {
  distanceUnits: DistanceUnits;
  setDistanceUnits: (distanceUnits: DistanceUnits) => void;
  setPlan: (plan: FullPlan) => void;
}

export const Settings: React.FC<SettingsProps> = (props) => {
  const [pace, setPace] = useState(defaultPace);
  const [minutes, setMinutes] = useState(String(extractPaceMinutes(pace)));
  const [seconds, setSeconds] = useState(String(extractPaceSeconds(pace)));
  const [warmUpDistance, setWarmUpDistance] = useState(defaultWarmUpDistance);

  const distanceUnitsChange = (nextValue: string) => {
    props.setDistanceUnits(nextValue as DistanceUnits);
    const nextPace = convertPace(pace, nextValue as DistanceUnits);
    paceChange(nextPace);
  };

  const paceChange = (nextPace: Pace) => {
    setPace(nextPace);
    setMinutes(String(extractPaceMinutes(nextPace) || ''));
    setSeconds(String(extractPaceSeconds(nextPace) || ''));
    props.setPlan(getFullPlan(warmUpDistance, nextPace));
  };

  const timeChange = (_minutes: string, _seconds: string) => {
    const nextPace = getPace(props.distanceUnits, parseInt(_minutes) || 0, parseInt(_seconds) || 0);
    paceChange(nextPace);
  };

  const warmUpDistanceChange = (_warmUpDistance: string) => {
    const nextWarmUpDistance = parseFloat(_warmUpDistance);
    setWarmUpDistance(nextWarmUpDistance);
    props.setPlan(getFullPlan(nextWarmUpDistance, pace));
  };

  return (
    <React.Fragment>
      <h2>Settings</h2>
      <RadioButtons
        label="Distance units"
        name="distanceUnits"
        onChange={distanceUnitsChange}
        options={[{ value: DistanceUnits.kilometers }, { value: DistanceUnits.miles }]}
        value={props.distanceUnits}
      />
      <RadioButtons
        label="Warm up/Cool down distance"
        name="warmUpDistance"
        onChange={warmUpDistanceChange}
        options={warmUpDistances.map((d) => ({
          label: getDisplayDistance(d, props.distanceUnits, true),
          value: String(d)
        }))}
        value={String(warmUpDistance)}
      />
      <div>
        Race pace:{' '}
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
    </React.Fragment>
  );
};
