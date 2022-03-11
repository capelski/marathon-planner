import React from 'react';

export interface RadioButtonsProps {
  name: string;
  label: string;
  onChange: (value: string) => void;
  options: { label?: string; value: string }[];
  value: string;
}

export const RadioButtons: React.FC<RadioButtonsProps> = (props) => {
  return (
    <div>
      {`${props.label}: `}
      <br />
      {props.options.map((option) => {
        return (
          <React.Fragment>
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
  );
};
