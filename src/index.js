import React from 'react';
import ReactDOM from 'react-dom';

import Login from './screens/login/Login';
import Controller from './screens/Controller';
import Home from './screens/home/Home';
import Profile from './screens/profile/Profile';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Controller />
  </React.StrictMode>,
  document.getElementById('root')
);
