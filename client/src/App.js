import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageOne from "./pages/pageOne/pageone";
import Boards from "./pages/Boards/Boards";
import Login from "./pages/login_page/login";
import Register from "./pages/register_page/register";
import React from "react";


import SurFaceScreen from "./pages/SurFace/surFace";
import PopOver from "./components/boardcanvas/Pop-over/PopOver";
import BoardHeader from "./components/boardcanvas/BoardHeader/BoardHeader";
import Signup from "./components/layout/Signup/signup";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageOne />} />
          <Route path="/boards" element={<Boards />} />
          <Route path="/boards/:boardId" element={<SurFaceScreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/surface" element={<SurFaceScreen />} />
          {/* <Route path="/signup" element={<Signup />} /> */}
          <Route path="/board-header" element={<BoardHeader />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
