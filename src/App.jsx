import { Routes, Route } from 'react-router'

// Component
import Layout from './components/Layout';

// Page JSX
import Home from './pages/Home.jsx';
import MapParis from './pages/MapParis.jsx';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path="/map-paris" element={<MapParis/>} />  
        </Route>
      </Routes>
    </>
  )
}

export default App
