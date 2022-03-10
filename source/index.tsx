import React from 'react';
import ReactDOM from 'react-dom';

const App: React.FC = () => {
  return <h1>Marathon planner</h1>;
};

const appPlaceholder = document.getElementById('app-placeholder');
ReactDOM.render(<App />, appPlaceholder);
