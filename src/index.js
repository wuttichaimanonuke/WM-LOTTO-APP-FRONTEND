import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/ie11'; // For IE 11 support
import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// import ManageCookie from './script/cookie/ManageCookie';

// document.cookie = 'appToken=7a4b758e-cc2e-4ff4-9e52-7ba07520c168;';
// document.cookie = 'appUser=U01;';

// var abc = new ManageCookie();
// var strCookie = abc.getCookie('appToken');
// console.log('-->', strCookie, abc.getCookie('appUser'))

// sessionStorage.setItem('myData', 777);

console.log('index.js display cookies :',document.cookie);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
