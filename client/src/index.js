import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

localStorage.setItem('URL', 'http://localhost:5000/api/v1/')

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
