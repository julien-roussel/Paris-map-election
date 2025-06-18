import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';

// CSS
import './scss/index.scss'
import './scss/font.scss'
import './scss/color.scss'
import './Components/select/select.scss'

// PAGE JSX
import App from './App.jsx'

// Context
import { ElectionsProvider } from "./context/ElectionsContext.jsx";
import { MapProvider } from "./context/MapContext.jsx";
import { AuthProvider } from './context/AuthContext.jsx';
import { ResponsiveProvider } from './context/ResponsiveContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MapProvider>
          <ElectionsProvider>
            <ResponsiveProvider>
              <App />
            </ResponsiveProvider>
          </ElectionsProvider>
        </MapProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>    
)
