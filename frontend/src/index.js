import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from "axios"

if (process.env.NODE_ENV === "development") {
    axios.defaults.baseURL = `http://localhost:8080`;
} else if (process.env.NODE_ENV === "production") {
    axios.defaults.baseURL = ``;
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);