import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import fetchImage from './api/fatchImages';

fetchImage();


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
