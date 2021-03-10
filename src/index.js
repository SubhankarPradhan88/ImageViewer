import React from 'react';
import ReactDOM from 'react-dom';

import Login from './screens/login/Login';
import Home from './screens/home/Home';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>,
  document.getElementById('root')
);
