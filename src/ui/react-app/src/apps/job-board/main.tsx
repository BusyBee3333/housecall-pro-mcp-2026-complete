import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';

// MCP API interface (injected by MCP runtime)
declare global {
  interface Window {
    mcpAPI: any;
  }
}

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App api={window.mcpAPI} />
    </React.StrictMode>
  );
}
