//frontend/src/App.js
import HomePage from "./pages/HomePage/HomePage";
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ResetPassword from './pages/ResetPassword/ResetPassword';
import Blog from "./pages/BlogPage/Blog";
import Reservation from "./pages/Reservation/Reservation";


function App() {
  return (
    <Router>
      <div className="App"> 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/reservation" element={<Reservation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;