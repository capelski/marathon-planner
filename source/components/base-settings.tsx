import React, { useEffect, useState } from 'react';
import {
  convertPace,
  createDistance,
  dateToIsoString,
  extractPaceMinutes,
  extractPaceSeconds,
  getDisplayDistance,
  getPace,
  getPacedDistance,
  isoStringToLocalDate
} from '../logic';
import { DistanceUnits, warmUpDistances } from '../models';
import { BaseSettings } from '../types';
import { RadioButtons } from './radio-buttons';

export interface BaseSettingsComponentProps {
  baseSettings: BaseSettings;
  setBaseSettings: (baseSettings: BaseSettings) => void;
}

export const BaseSettingsComponent: React.FC<BaseSettingsComponentProps> = (props) => {
  const [minutes, setMinutes] = useState(extractPaceMinutes(props.baseSettings.racePace.seconds));
  const [seconds, setSeconds] = useState(extractPaceSeconds(props.baseSettings.racePace.seconds));

  const distanceUnitsChange = (nextValue: string) => {
    const nextDistanceUnits = nextValue as DistanceUnits;
    const nextRacePace = convertPace(props.baseSettings.racePace, nextDistanceUnits);
    props.setBaseSettings({
      ...props.baseSettings,
      distanceUnits: nextDistanceUnits,
      racePace: nextRacePace
    });
  };

  const skipRecoveryChange = (nextSkipRecovery: boolean) => {
    props.setBaseSettings({
      ...props.baseSettings,
      skipRecovery: nextSkipRecovery
    });
  };

  const startDateChange = (nextDate: string) => {
    const nextStartDate = isoStringToLocalDate(nextDate);
    props.setBaseSettings({
      ...props.baseSettings,
      startDate: nextStartDate
    });
  };

  const timeChange = (_minutes: string, _seconds: string) => {
    const nextRacePace = getPace(
      props.baseSettings.distanceUnits,
      parseInt(_minutes) || 0,
      parseInt(_seconds) || 0
    );
    setMinutes(extractPaceMinutes(nextRacePace.seconds));
    setSeconds(extractPaceSeconds(nextRacePace.seconds));
    props.setBaseSettings({
      ...props.baseSettings,
      racePace: nextRacePace
    });
  };

  const warmUpDistanceChange = (_warmUpDistance: string) => {
    const nextWarmUpDistance = createDistance(
      parseFloat(_warmUpDistance),
      props.baseSettings.warmUpDistance.distanceUnits
    );
    props.setBaseSettings({
      ...props.baseSettings,
      warmUpDistance: nextWarmUpDistance
    });
  };

  useEffect(() => {
    setMinutes(extractPaceMinutes(props.baseSettings.racePace.seconds));
    setSeconds(extractPaceSeconds(props.baseSettings.racePace.seconds));
  }, [props.baseSettings.racePace]);

  const convertedWarmUpDistances = warmUpDistances.map((distance) => ({
    original: distance,
    converted: getPacedDistance(distance, props.baseSettings.racePace)
  }));

  return (
    <React.Fragment>
      <h2>Settings</h2>
      <RadioButtons
        label="Distance units"
        name="distanceUnits"
        onChange={distanceUnitsChange}
        options={[{ value: DistanceUnits.kilometers }, { value: DistanceUnits.miles }]}
        style={{ marginBottom: 8 }}
        value={props.baseSettings.distanceUnits}
      />
      <RadioButtons
        label="Warm up/Cool down distance"
        name="warmUpDistance"
        onChange={warmUpDistanceChange}
        options={convertedWarmUpDistances.map((cd) => ({
          label: getDisplayDistance(cd.converted),
          value: String(cd.original.value)
        }))}
        style={{ marginBottom: 8 }}
        value={String(props.baseSettings.warmUpDistance.value)}
      />
      <div style={{ marginBottom: 8 }}>
        Race pace: <br />
        <div style={{ display: 'inline-block', marginLeft: 4, marginTop: 4 }}>
          <input
            onChange={(event) => timeChange(event.target.value, String(seconds))}
            type="number"
            style={{ width: 50 }}
            value={String(minutes)}
          />
          {" ' "}
          <input
            onChange={(event) => timeChange(String(minutes), event.target.value)}
            type="number"
            style={{ width: 50 }}
            value={String(seconds)}
          />
          {' " / '}
          {props.baseSettings.distanceUnits}
        </div>
      </div>
      <div style={{ marginBottom: 8 }}>
        Start date: <br />
        <input
          onChange={(event) => startDateChange(event.target.value)}
          style={{ marginLeft: 4, marginTop: 4 }}
          type="date"
          value={dateToIsoString(props.baseSettings.startDate)}
        />
      </div>
      <div style={{ marginBottom: 8 }}>
        <input
          checked={props.baseSettings.skipRecovery}
          onChange={(event) => {
            skipRecoveryChange(event.target.checked);
          }}
          type="checkbox"
        />
        Skip recovery trainings
      </div>
    </React.Fragment>
  );
};
