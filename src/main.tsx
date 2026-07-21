import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Fuentes auto-alojadas (sin depender de Google Fonts en runtime)
import '@fontsource-variable/fraunces'; // serif editorial (opsz + wght)
import '@fontsource-variable/fraunces/standard-italic.css';
import '@fontsource-variable/inter'; // sans de cuerpo
import '@fontsource/ibm-plex-mono/400.css'; // mono de "pizarra de mercado"
import '@fontsource/ibm-plex-mono/500.css';

import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
