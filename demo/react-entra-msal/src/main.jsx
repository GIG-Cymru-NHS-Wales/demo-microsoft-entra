import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PublicClientApplication } from '@azure/msal-browser'
import { MsalProvider } from '@azure/msal-react'
import { msalConfig } from './authConfig.js'

const msalInstance = new PublicClientApplication(msalConfig);

async function startApp() {
    await msalInstance.initialize();

    createRoot(document.getElementById('root')).render(
        <StrictMode>
            <MsalProvider instance={msalInstance}>
                <App />
            </MsalProvider>
        </StrictMode>,
        );
}

startApp();