import React from 'react';

export interface TrainingCheckboxProps {
  isCompleted: boolean;
  toggleCompleted: () => void;
}

export const TrainingCheckbox: React.FC<TrainingCheckboxProps> = (props) => {
  return (
    <span style={{ marginLeft: -4, paddingRight: 8 }}>
      <input checked={props.isCompleted} onChange={props.toggleCompleted} type="checkbox" />
    </span>
  );
};
