import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageOne from "./pages/pageOne/pageone";
import Boards from "./pages/Boards/Boards";
import Login from "./pages/login_page/login";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageOne />} />
          <Route path="/boards" element={<Boards />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
