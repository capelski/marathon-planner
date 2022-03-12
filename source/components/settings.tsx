import React from 'react';
import { getFullPlan } from '../logic';
import { DistanceUnits, warmUpDistances } from '../models';
import { FullPlan } from '../types';
import { getDisplayDistance } from './distance';
import { RadioButtons } from './radio-buttons';

export interface SettingsProps {
  distanceUnits: DistanceUnits;
  warmUpDistance: number;
  setDistanceUnits: (distanceUnits: DistanceUnits) => void;
  setPlan: (plan: FullPlan) => void;
  setWarmUpDistance: (warmUpDistance: number) => void;
}

export const Settings: React.FC<SettingsProps> = (props) => {
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
          props.setWarmUpDistance(nextWarmUpDistance);
          props.setPlan(getFullPlan(nextWarmUpDistance));
        }}
        options={warmUpDistances.map((d) => ({
          label: getDisplayDistance(d, props.distanceUnits, true),
          value: String(d)
        }))}
        value={String(props.warmUpDistance)}
      />
    </React.Fragment>
  );
};
