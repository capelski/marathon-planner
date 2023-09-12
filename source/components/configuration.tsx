import React, { useEffect, useState } from 'react';
import { defaultConfiguration, defaultSettings } from '../constants';
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
import { Configuration } from '../types';
import { Modal } from './modal';
import { RadioButtons } from './radio-buttons';

export interface ConfigurationComponentProps {
  configuration: Configuration;
  updateConfiguration: (configuration: Configuration) => void;
}

export const ConfigurationComponent: React.FC<ConfigurationComponentProps> = (props) => {
  const [displayClearPlanWarning, setDisplayClearPlanWarning] = useState(false);
  const [displayResetSettingsWarning, setDisplayResetSettingsWarning] = useState(false);
  const [minutes, setMinutes] = useState(
    extractPaceMinutes(props.configuration.settings.racePace.seconds)
  );
  const [seconds, setSeconds] = useState(
    extractPaceSeconds(props.configuration.settings.racePace.seconds)
  );

  const distanceUnitsChange = (nextValue: string) => {
    const nextDistanceUnits = nextValue as DistanceUnits;
    const nextRacePace = convertPace(props.configuration.settings.racePace, nextDistanceUnits);
    props.updateConfiguration({
      ...props.configuration,
      settings: {
        ...props.configuration.settings,
        distanceUnits: nextDistanceUnits,
        racePace: nextRacePace
      }
    });
  };

  const skipRecoveryChange = (nextSkipRecovery: boolean) => {
    props.updateConfiguration({
      ...props.configuration,
      settings: {
        ...props.configuration.settings,
        skipRecovery: nextSkipRecovery
      }
    });
  };

  const startDateChange = (nextDate: string) => {
    const nextStartDate = isoStringToLocalDate(nextDate);
    props.updateConfiguration({
      ...props.configuration,
      startDate: nextStartDate
    });
  };

  const timeChange = (_minutes: string, _seconds: string) => {
    const nextRacePace = getPace(
      props.configuration.settings.distanceUnits,
      parseInt(_minutes) || 0,
      parseInt(_seconds) || 0
    );
    setMinutes(extractPaceMinutes(nextRacePace.seconds));
    setSeconds(extractPaceSeconds(nextRacePace.seconds));
    props.updateConfiguration({
      ...props.configuration,
      settings: {
        ...props.configuration.settings,
        racePace: nextRacePace
      }
    });
  };

  const warmUpDistanceChange = (_warmUpDistance: string) => {
    const nextWarmUpDistance = createDistance(
      parseFloat(_warmUpDistance),
      props.configuration.settings.warmUpDistance.distanceUnits
    );

    props.updateConfiguration({
      ...props.configuration,
      settings: {
        ...props.configuration.settings,
        warmUpDistance: nextWarmUpDistance
      }
    });
  };

  const clearPlanHandler = () => {
    props.updateConfiguration({
      ...defaultConfiguration,
      settings: props.configuration.settings
    });
    setDisplayClearPlanWarning(false);
  };

  const resetSettingsHandler = () => {
    props.updateConfiguration({ ...props.configuration, settings: defaultSettings });
    setDisplayResetSettingsWarning(false);
  };

  useEffect(() => {
    setMinutes(extractPaceMinutes(props.configuration.settings.racePace.seconds));
    setSeconds(extractPaceSeconds(props.configuration.settings.racePace.seconds));
  }, [props.configuration.settings.racePace]);

  const { settings: _s1, expandedWeeks: _e1, ...defaultPlanData } = defaultConfiguration;
  const { settings: _s2, expandedWeeks: _e2, ...planData } = props.configuration;
  const disableClearPlan = JSON.stringify(defaultPlanData) === JSON.stringify(planData);

  const disableResetSettings =
    JSON.stringify(defaultSettings) === JSON.stringify(props.configuration.settings);

  const convertedWarmUpDistances = warmUpDistances.map((distance) => ({
    original: distance,
    converted: getPacedDistance(distance, props.configuration.settings.racePace)
  }));

  return (
    <React.Fragment>
      <div style={{ marginBottom: 16 }}>
        Start date
        <br />
        <input
          onChange={(event) => startDateChange(event.target.value)}
          style={{ marginLeft: 4, marginTop: 4 }}
          type="date"
          value={dateToIsoString(props.configuration.startDate)}
        />
      </div>
      <button
        type="button"
        onClick={() => setDisplayClearPlanWarning(true)}
        disabled={disableClearPlan}
      >
        ↩️ Clear plan data
      </button>
      <br />

      <div style={{ maxWidth: '100%', width: 400 }}>
        <hr />
      </div>

      <br />
      <RadioButtons
        label="Distance units"
        name="distanceUnits"
        onChange={distanceUnitsChange}
        options={[{ value: DistanceUnits.kilometers }, { value: DistanceUnits.miles }]}
        style={{ marginBottom: 16 }}
        value={props.configuration.settings.distanceUnits}
      />
      <RadioButtons
        label="Warm up/Cool down distance"
        name="warmUpDistance"
        onChange={warmUpDistanceChange}
        options={convertedWarmUpDistances.map((cd) => ({
          label: getDisplayDistance(cd.converted),
          value: String(cd.original.value)
        }))}
        style={{ marginBottom: 16 }}
        value={String(props.configuration.settings.warmUpDistance.value)}
      />
      <div style={{ marginBottom: 16 }}>
        Race pace
        <br />
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
          {props.configuration.settings.distanceUnits}
        </div>
      </div>
      <div style={{ marginBottom: 16 }}>
        <input
          checked={props.configuration.settings.skipRecovery}
          onChange={(event) => {
            skipRecoveryChange(event.target.checked);
          }}
          type="checkbox"
        />
        Skip recovery trainings
      </div>
      <button
        type="button"
        onClick={() => setDisplayResetSettingsWarning(true)}
        disabled={disableResetSettings}
      >
        ↩️ Reset settings
      </button>

      {displayResetSettingsWarning && (
        <Modal closeHandler={() => setDisplayResetSettingsWarning(false)}>
          <p>Resetting the settings will restore the default values. Continue?</p>
          <div>
            <button type="button" onClick={resetSettingsHandler} style={{ marginRight: 16 }}>
              ✅ Yes
            </button>
            <button
              type="button"
              onClick={() => setDisplayResetSettingsWarning(false)}
              style={{ marginRight: 16 }}
            >
              ❌ No
            </button>
          </div>
        </Modal>
      )}

      {displayClearPlanWarning && (
        <Modal closeHandler={() => setDisplayClearPlanWarning(false)}>
          <p>
            Clearing the plan data will reset the completed trainings, skipped weeks and start date.
            Continue?
          </p>
          <div>
            <button type="button" onClick={clearPlanHandler} style={{ marginRight: 16 }}>
              ✅ Yes
            </button>
            <button
              type="button"
              onClick={() => setDisplayClearPlanWarning(false)}
              style={{ marginRight: 16 }}
            >
              ❌ No
            </button>
          </div>
        </Modal>
      )}
    </React.Fragment>
  );
};
