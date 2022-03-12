import React, { useState } from 'react';
import { getFullPlan } from '../logic';
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
  const [targetPaceMinutes, setTargetPaceMinutes] = useState('5');
  const [targetPaceSeconds, setTargetPaceSeconds] = useState('30');
  const [warmUpDistance, setWarmUpDistance] = useState(warmUpDistances[0]);

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
        onChange={(nextValue) => {
          const nextWarmUpDistance = parseFloat(nextValue);
          setWarmUpDistance(nextWarmUpDistance);
          props.setPlan(getFullPlan(nextWarmUpDistance));
        }}
        options={warmUpDistances.map((d) => ({
          label: getDisplayDistance(d, props.distanceUnits, true),
          value: String(d)
        }))}
        value={String(warmUpDistance)}
      />
      <div>
        Target pace:{' '}
        <input
          onChange={(event) => setTargetPaceMinutes(event.target.value)}
          type="number"
          style={{ width: 50 }}
          value={targetPaceMinutes}
        />
        {" ' "}
        <input
          onChange={(event) => setTargetPaceSeconds(event.target.value)}
          type="number"
          style={{ width: 50 }}
          value={targetPaceSeconds}
        />
        {' " / '}
        {props.distanceUnits}
      </div>
    </React.Fragment>
  );
};
