import React, { useState } from 'react';
import { defaultDistanceUnits, defaultRacePace, defaultWarmUpDistance } from '../constants';
import {
  convertDistance,
  convertPace,
  createDistance,
  extractPaceMinutes,
  extractPaceSeconds,
  getDetailedPlan,
  getDisplayDistance,
  getPace
} from '../logic';
import { DistanceUnits, warmUpDistances } from '../models';
import { DetailedPlan, Pace } from '../types';
import { RadioButtons } from './radio-buttons';

export interface SettingsProps {
  setPlan: (plan: DetailedPlan) => void;
}

export const Settings: React.FC<SettingsProps> = (props) => {
  const [distanceUnits, setDistanceUnits] = useState<DistanceUnits>(defaultDistanceUnits);
  const [racePace, setPace] = useState(defaultRacePace);
  const [minutes, setMinutes] = useState(String(extractPaceMinutes(defaultRacePace)));
  const [seconds, setSeconds] = useState(String(extractPaceSeconds(defaultRacePace)));
  const [warmUpDistance, setWarmUpDistance] = useState(defaultWarmUpDistance);

  const distanceUnitsChange = (nextValue: string) => {
    setDistanceUnits(nextValue as DistanceUnits);
    const nextPace = convertPace(racePace, nextValue as DistanceUnits);
    racePaceChange(nextPace);
  };

  const racePaceChange = (nextPace: Pace) => {
    setPace(nextPace);
    setMinutes(String(extractPaceMinutes(nextPace) || ''));
    setSeconds(String(extractPaceSeconds(nextPace) || ''));
    props.setPlan(getDetailedPlan(warmUpDistance, nextPace));
  };

  const timeChange = (_minutes: string, _seconds: string) => {
    const nextPace = getPace(distanceUnits, parseInt(_minutes) || 0, parseInt(_seconds) || 0);
    racePaceChange(nextPace);
  };

  const warmUpDistanceChange = (_warmUpDistance: string) => {
    const nextWarmUpDistance = createDistance(
      parseFloat(_warmUpDistance),
      warmUpDistance.distanceUnits
    );
    setWarmUpDistance(nextWarmUpDistance);
    props.setPlan(getDetailedPlan(nextWarmUpDistance, racePace));
  };

  return (
    <React.Fragment>
      <h2>Settings</h2>
      <RadioButtons
        label="Distance units"
        name="distanceUnits"
        onChange={distanceUnitsChange}
        options={[{ value: DistanceUnits.kilometers }, { value: DistanceUnits.miles }]}
        value={distanceUnits}
      />
      <RadioButtons
        label="Warm up/Cool down distance"
        name="warmUpDistance"
        onChange={warmUpDistanceChange}
        options={warmUpDistances.map((distance) => ({
          label: getDisplayDistance(convertDistance(distance, distanceUnits)),
          value: String(distance.value)
        }))}
        value={String(warmUpDistance.value)}
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
        {distanceUnits}
      </div>
    </React.Fragment>
  );
};
