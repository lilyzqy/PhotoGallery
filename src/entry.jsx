import React from 'react';
import ReactDOM from 'react-dom';

import App from './js/App.js';
import './scss/reset.scss';
import './scss/app.scss';
import './scss/gallery.scss';

document.addEventListener('DOMContentLoaded',()=>{
  const root = document.getElementById('root');
  ReactDOM.render(<App />, root);
});
