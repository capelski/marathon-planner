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
import { Settings } from '../types';
import { RadioButtons } from './radio-buttons';

export interface SettingsComponentProps {
  settings: Settings;
  setSettings: (settings: Settings) => void;
}

export const SettingsComponent: React.FC<SettingsComponentProps> = (props) => {
  const [minutes, setMinutes] = useState(extractPaceMinutes(props.settings.racePace.seconds));
  const [seconds, setSeconds] = useState(extractPaceSeconds(props.settings.racePace.seconds));

  const distanceUnitsChange = (nextValue: string) => {
    const nextDistanceUnits = nextValue as DistanceUnits;
    const nextRacePace = convertPace(props.settings.racePace, nextDistanceUnits);
    props.setSettings({
      ...props.settings,
      distanceUnits: nextDistanceUnits,
      racePace: nextRacePace
    });
  };

  const skipRecoveryChange = (nextSkipRecovery: boolean) => {
    props.setSettings({
      ...props.settings,
      skipRecovery: nextSkipRecovery
    });
  };

  const startDateChange = (nextDate: string) => {
    const nextStartDate = isoStringToLocalDate(nextDate);
    props.setSettings({
      ...props.settings,
      startDate: nextStartDate
    });
  };

  const timeChange = (_minutes: string, _seconds: string) => {
    const nextRacePace = getPace(
      props.settings.distanceUnits,
      parseInt(_minutes) || 0,
      parseInt(_seconds) || 0
    );
    setMinutes(extractPaceMinutes(nextRacePace.seconds));
    setSeconds(extractPaceSeconds(nextRacePace.seconds));
    props.setSettings({
      ...props.settings,
      racePace: nextRacePace
    });
  };

  const warmUpDistanceChange = (_warmUpDistance: string) => {
    const nextWarmUpDistance = createDistance(
      parseFloat(_warmUpDistance),
      props.settings.warmUpDistance.distanceUnits
    );
    props.setSettings({
      ...props.settings,
      warmUpDistance: nextWarmUpDistance
    });
  };

  useEffect(() => {
    setMinutes(extractPaceMinutes(props.settings.racePace.seconds));
    setSeconds(extractPaceSeconds(props.settings.racePace.seconds));
  }, [props.settings.racePace]);

  const convertedWarmUpDistances = warmUpDistances.map((distance) => ({
    original: distance,
    converted: getPacedDistance(distance, props.settings.racePace)
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
        value={props.settings.distanceUnits}
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
        value={String(props.settings.warmUpDistance.value)}
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
          {props.settings.distanceUnits}
        </div>
      </div>
      <div style={{ marginBottom: 8 }}>
        Start date: <br />
        <input
          onChange={(event) => startDateChange(event.target.value)}
          style={{ marginLeft: 4, marginTop: 4 }}
          type="date"
          value={dateToIsoString(props.settings.startDate)}
        />
      </div>
      <div style={{ marginBottom: 8 }}>
        <input
          checked={props.settings.skipRecovery}
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
