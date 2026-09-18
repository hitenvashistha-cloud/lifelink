import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import { SocketProvider } from './context/SocketContext';
import { ToastProvider } from './context/ToastContext';
import App from './App';
import './index.css';

axios.defaults.baseURL = import.meta.env.VITE_API_URL || '';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastProvider>
      <SocketProvider>
        <App />
      </SocketProvider>
    </ToastProvider>
  </React.StrictMode>
);