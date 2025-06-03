import { useEffect } from 'react';
import { Routes, Route } from 'react-router'

// Component
import Layout from './components/Layout';
import LayoutMap from './components/LayoutMap';

// Page JSX
import Home from './pages/Home.jsx';
import AnalyseMap from './pages/AnalyseMap.jsx';
import About from './pages/About.jsx';
import Nothing from './pages/Nothing.jsx';
import Login from './pages/account/Login.jsx';
import SignUp from './pages/account/SignUp.jsx';
import Verify from './pages/account/Verify.jsx';

// Contexte
import { useMap } from "./context/MapContext"

function App() {
  const { loadAllNameMap } = useMap();
  
    useEffect(() => {
      loadAllNameMap();
    }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path="/about" element={<About/>} />  
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/verify/:token" element={<Verify/>} />
          <Route path='*' element={<Nothing/>} />
        </Route>
        <Route path="/" element={<LayoutMap/>}>
          <Route path="/analyse-map" element={<AnalyseMap/>} />  
          <Route path="/analyse-map/:departement" element={<AnalyseMap/>} />  
        </Route>
      </Routes>
    </>
  )
}

export default App
