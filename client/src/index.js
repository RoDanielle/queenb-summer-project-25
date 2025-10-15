import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';
import { RecipeProvider } from './context/RecipeContext';
import { UserProvider } from './context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <RecipeProvider>
        <App />
      </RecipeProvider>
    </UserProvider>
  </React.StrictMode>
);
