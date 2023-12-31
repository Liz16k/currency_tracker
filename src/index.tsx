import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

const container = document.getElementById('root');
const root = createRoot(container ?? document.createElement('div'));

root.render(
  // <React.StrictMode>
  <BrowserRouter basename="currency_tracker">
    <App />
  </BrowserRouter>,
  // </React.StrictMode>,
);
