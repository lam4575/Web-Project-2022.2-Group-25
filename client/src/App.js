import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageOne from "./pages/pageOne/pageone";
import Boards from "./pages/Boards/Boards";
import SurFaceScreen from "./pages/SurFace/surFace";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageOne />} />
          <Route path="/boards" element={<Boards />} />
          <Route path="/surface" element={<SurFaceScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
