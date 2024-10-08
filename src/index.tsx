import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import 'antd/dist/reset.css';
import { App } from './App.tsx';
import './index.css';
import { register } from './serviceWorker.js';

register();

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Router basename='/LifeManager'>
      <App />
    </Router>
  </React.StrictMode>
);
