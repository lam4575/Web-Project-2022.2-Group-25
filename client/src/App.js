import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageOne from "./pages/pageOne/pageone";
import Boards from "./pages/PageTwo";
import { Login } from "./login_page/login";


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
