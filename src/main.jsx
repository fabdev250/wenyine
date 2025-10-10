import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Dev-only global handlers to capture unhandled promise rejections and errors.
// These help identify whether errors like "Could not establish connection. Receiving end does not exist."
// originate from app code or from a browser extension. This runs only in Vite's dev mode.
if (import.meta.env && import.meta.env.DEV) {
  window.addEventListener('unhandledrejection', (event) => {
    // event.reason may be an Error or any value
    // Log as much as we can to the console so the developer can inspect stack/source
    // eslint-disable-next-line no-console
    console.warn('Dev: unhandledrejection captured:', event.reason);
    try {
      if (event.reason && event.reason.stack) {
        // eslint-disable-next-line no-console
        console.warn('Dev: rejection stack:', event.reason.stack);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('Dev: could not read rejection stack', err);
    }
  });

  window.addEventListener('error', (event) => {
    // eslint-disable-next-line no-console
    console.warn('Dev: window error captured:', event.message, event.error || event);
  });
}
