import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './assets/global-styles/reset.css';
import './assets/global-styles/style.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
