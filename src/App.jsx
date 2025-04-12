import { Routes, Route } from 'react-router'

// Component
import Layout from './components/Layout';

// Page JSX
import Home from './pages/Home.jsx';
import AnalyseMap from './pages/AnalyseMap.jsx';
import About from './pages/About.jsx';
import Nothing from './pages/Nothing.jsx';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path="/analyse-map" element={<AnalyseMap/>} />  
          <Route path="/about" element={<About/>} />  
          <Route path='*' element={<Nothing/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
