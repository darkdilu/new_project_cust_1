import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Testing from './components/testing';
import GLTFViewer from './components/canvas';
import Testing3 from './components/testing3';
import Canvas2 from './components/testing4';

function App() {
  const apiUrl = 'http://localhost:3000/api/gltf/get_gltf/crop_top.gltf';

  return (
    <>
     <Router>
      <Routes>
        <Route path="/testing" element={<Testing />}></Route>
        <Route path="/testing2" element={<GLTFViewer  url={apiUrl} />}></Route>
        <Route path="/testing3" element={<Testing3 />}></Route>
        <Route path="/testing4" element={<Canvas2 />}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
