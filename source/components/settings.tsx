import React, { useState } from 'react';
import { defaultPace, defaultWarmUpDistance } from '../constants';
import { getFullPlan, getPace, getPaceMinutes, getPaceSeconds } from '../logic';
import { DistanceUnits, warmUpDistances } from '../models';
import { FullPlan } from '../types';
import { getDisplayDistance } from './distance';
import { RadioButtons } from './radio-buttons';

export interface SettingsProps {
  distanceUnits: DistanceUnits;
  setDistanceUnits: (distanceUnits: DistanceUnits) => void;
  setPlan: (plan: FullPlan) => void;
}

export const Settings: React.FC<SettingsProps> = (props) => {
  const [paceMinutes, setPaceMinutes] = useState(String(getPaceMinutes(defaultPace)));
  const [paceSeconds, setPaceSeconds] = useState(String(getPaceSeconds(defaultPace)));
  const [warmUpDistance, setWarmUpDistance] = useState(defaultWarmUpDistance);

  const setPlan = (_paceMinutes: string, _paceSeconds: string, _warmUpDistance: number) => {
    const pace = getPace(parseInt(_paceMinutes), parseInt(_paceSeconds));
    props.setPlan(getFullPlan(_warmUpDistance, pace));
  };

  const paceChange = (_paceMinutes: string, _paceSeconds: string) => {
    setPaceMinutes(_paceMinutes);
    setPaceSeconds(_paceSeconds);
    setPlan(_paceMinutes, _paceSeconds, warmUpDistance);
  };

  const warmUpDistanceChange = (_warmUpDistance: string) => {
    const nextWarmUpDistance = parseFloat(_warmUpDistance);
    setWarmUpDistance(nextWarmUpDistance);
    setPlan(paceMinutes, paceSeconds, nextWarmUpDistance);
  };

  return (
    <React.Fragment>
      <h2>Settings</h2>
      <RadioButtons
        label="Distance units"
        name="distanceUnits"
        onChange={(nextValue) => props.setDistanceUnits(nextValue as DistanceUnits)}
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
          onChange={(event) => paceChange(event.target.value, paceSeconds)}
          type="number"
          style={{ width: 50 }}
          value={paceMinutes}
        />
        {" ' "}
        <input
          onChange={(event) => paceChange(paceMinutes, event.target.value)}
          type="number"
          style={{ width: 50 }}
          value={paceSeconds}
        />
        {' " / '}
        {props.distanceUnits}
      </div>
    </React.Fragment>
  );
};
