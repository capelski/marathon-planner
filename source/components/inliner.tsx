import React from 'react';

export interface InlinerProps {
  style?: React.CSSProperties;
}

export const Inliner: React.FC<InlinerProps> = (props) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: 4, ...props.style }}>
      {props.children}
    </div>
  );
};
