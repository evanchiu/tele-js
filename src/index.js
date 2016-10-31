import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ClientConfig from './ClientConfig';
import './css/bootstrap.css';
import './css/tele.css';

ReactDOM.render(
  <App config={ClientConfig} />,
  document.getElementById('root')
);
