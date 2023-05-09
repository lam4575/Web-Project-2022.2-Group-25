import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageOne from "./pages/pageOne/pageone";
import Boards from "./pages/PageTwo";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageOne />} />
          <Route path="/boards" element={<Boards />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
