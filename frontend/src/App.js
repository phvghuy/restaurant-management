import HomePage from "./pages/HomePage/HomePage";
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Blog from "./pages/BlogPage/Blog";
import Reservation from "./pages/Reservation/Reservation";
import Contact from "./pages/Contact/Contact";

function App() {
  return (
    <Router>
      <div className="App"> 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;