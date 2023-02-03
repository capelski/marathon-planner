import React from 'react';
import { getDisplayDistance } from '../logic';
import { Distance, PacedDistance } from '../types';
import { Inliner } from './inliner';
import { PaceComponent } from './pace';
import { Time } from './time';

export interface DistanceProps {
  distance: Distance | PacedDistance;
  symbol?: string;
}

export const DistanceComponent: React.FC<DistanceProps> = (props) => {
  return (
    <Inliner>
      {props.children}
      <span style={{ paddingRight: 4 }}>
        {props.symbol} {getDisplayDistance(props.distance)}
      </span>
      {'pace' in props.distance ? (
        <React.Fragment>
          <PaceComponent pace={props.distance.pace} />
          <Time seconds={props.distance.pace.seconds * props.distance.value} />
        </React.Fragment>
      ) : undefined}
    </Inliner>
  );
};
