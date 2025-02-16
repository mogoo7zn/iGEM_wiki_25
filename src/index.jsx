import React from 'react';
import { createRoot } from 'react-dom/client';
import ErrorBoundary from './components/Common/ErrorBoundary';
import App from './App';
import './styles/global.css';
import './styles/animations.css';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element not found');
}

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
