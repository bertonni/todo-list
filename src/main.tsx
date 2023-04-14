import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { TodosContextProvider } from './contexts/TodosContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TodosContextProvider>
      <App />
    </TodosContextProvider>
  </React.StrictMode>,
)
