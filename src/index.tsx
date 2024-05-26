import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/reset.css';
import { App } from './App.tsx';
import './index.css';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
<React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</React.StrictMode>
);
