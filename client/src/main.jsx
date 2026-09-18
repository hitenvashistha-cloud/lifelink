import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import { SocketProvider } from './context/SocketContext';
import App from './App';
import './index.css';

// Set axios base URL for all requests
axios.defaults.baseURL = import.meta.env.VITE_API_URL || '';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SocketProvider>
      <App />
    </SocketProvider>
  </React.StrictMode>
);