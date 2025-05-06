import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';

// CSS
import './scss/index.scss'
import './scss/font.scss'
import './scss/color.scss'

// PAGE JSX
import App from './App.jsx'

// Context
import { ElectionsProvider } from "./context/ElectionsContext.jsx";
import { MapProvider } from "./context/MapContext.jsx";

createRoot(document.getElementById('root')).render(
  <MapProvider>
    <ElectionsProvider>
      <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StrictMode> 
    </ElectionsProvider>
  </MapProvider>
)
