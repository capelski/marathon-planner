import React from 'react';

export interface RadioButtonsProps {
  name: string;
  label: string;
  onChange: (value: string) => void;
  options: { label?: string; value: string }[];
  style?: React.CSSProperties;
  value: string;
}

export const RadioButtons: React.FC<RadioButtonsProps> = (props) => {
  return (
    <div style={props.style}>
      {`${props.label}: `}
      <br />
      <div style={{ display: 'inline-block', marginLeft: 4 }}>
        {props.options.map((option) => {
          return (
            <React.Fragment key={option.value}>
              {' '}
              <input
                checked={props.value === option.value}
                name={props.name}
                onChange={(event) => props.onChange(event.target.value)}
                type="radio"
                value={option.value}
              />{' '}
              {option.label || option.value}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
