import React from 'react';
import ReactDOM from 'react-dom';

import App from './js/App.js';
import './scss/basic.scss';
import './scss/more.scss';

document.addEventListener('DOMContentLoaded',()=>{
  const root = document.getElementById('root');
  ReactDOM.render(<App />, root);
});
