import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import React from "react";
import ReactDOM from "react-dom";
import { DataProvider } from './DataContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  
  </StrictMode>,
)
