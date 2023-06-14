import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageOne from "./pages/pageOne/pageone";
import Boards from "./pages/Boards/Boards";
import Login from "./pages/login_page/login";

import SurFaceScreen from "./pages/SurFace/surFace";
import PopOver from "./components/boardcanvas/Pop-over/PopOver";
import BoardHeader from "./components/boardcanvas/BoardHeader/BoardHeader";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageOne />} />
          <Route path="/boards" element={<Boards />} />
          <Route path="/boards/:boardId" element={<SurFaceScreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/surface" element={<SurFaceScreen />} />

          <Route path="/board-header" element={<BoardHeader />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
