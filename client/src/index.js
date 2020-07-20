import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

localStorage.setItem('Clip', 'http://localhost:3000')
localStorage.setItem('URL', 'http://localhost:5000/api/v1/')

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
