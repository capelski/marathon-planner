import React from 'react';

export const Inliner: React.FC = (props) => {
  return <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: 4 }}>{props.children}</div>;
};
