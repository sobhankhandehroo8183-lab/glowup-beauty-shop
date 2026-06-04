import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// تشخیص محیط توسعه یا تولید
const isDevelopment = import.meta.env.DEV;
const basename = isDevelopment ? '/' : '/glowup-beauty-shop';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);