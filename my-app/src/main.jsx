import React from 'react';
import ReactDOM from 'react-dom/client'; // Use this in Vite projects (React 18+)
import './index.css'; // Your global styles (optional)
import App from './App'; // Import your root component
import 'bootstrap/dist/css/bootstrap.min.css';


// This creates the root DOM element where your app will be mounted
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
