import React from 'react';

export interface InlinerProps {
  style?: React.CSSProperties;
}

export const Inliner: React.FC<InlinerProps> = (props) => {
  return (
    <div style={{ alignItems: 'center', display: 'flex', flexWrap: 'wrap', ...props.style }}>
      {props.children}
    </div>
  );
};
