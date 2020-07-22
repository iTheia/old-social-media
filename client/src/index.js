import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

if (process.env.NODE_ENV === 'production') {
	localStorage.setItem('Clip', 'https://young-lowlands-83239.herokuapp.com/');
	localStorage.setItem(
		'URL',
		'https://young-lowlands-83239.herokuapp.com/api/v1/'
	);
} else {
	localStorage.setItem('Clip', 'http://localhost:8080/');
	localStorage.setItem('URL', 'http://localhost:8080/api/v1/');
}
ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
