import HomePage from "./pages/HomePage/HomePage";
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import BlogPageAdmin from "./pages/BlogPageAdmin/BlogPageAdmin";

function App() {
  return (
    <Router>
      <div className="App"> 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/BlogAdmin" element={<BlogPageAdmin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;