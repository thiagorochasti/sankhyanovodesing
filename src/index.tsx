import React from 'react';
import ReactDOM from 'react-dom/client';
import { applyPolyfills, defineCustomElements } from "@sankhyalabs/ezui/loader";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

applyPolyfills().then(() => {
  defineCustomElements();
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
