import React from 'react';
import ReactDOM from 'react-dom';
import Controller from './screens/Controller';
import './index.css';

{/* Render Controller component first, once the app loads */}
ReactDOM.render(
  <React.StrictMode>
    <Controller />    
  </React.StrictMode>,
  document.getElementById('root')
);
