<<<<<<< HEAD
import HomePage from "./pages/HomePage/HomePage";
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
=======
//frontend/src/App.js
import HomePage from "./pages/HomePage/HomePage";
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ResetPassword from './pages/ResetPassword/ResetPassword';
>>>>>>> develop

function App() {
  return (
    <Router>
      <div className="App"> 
        <Routes>
          <Route path="/" element={<HomePage />} />
<<<<<<< HEAD
=======
          <Route path="/reset-password" element={<ResetPassword />} />
>>>>>>> develop
        </Routes>
      </div>
    </Router>
  );
}

export default App;