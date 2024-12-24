//frontend/src/App.js
import HomePage from "./pages/HomePage/HomePage";
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Blog from "./pages/BlogPage/Blog";
import Contact from "./pages/Contact/Contact";
import Navbar from "./components/Navbar/Navbar";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import RegisterPopup from "./components/RegisterPopup/RegisterPopup";
import { useState } from "react";
import Footer from "./components/Footer/Footer";
import ResetPassword from './pages/ResetPassword/ResetPassword';
import Reservation from "./pages/Reservation/Reservation";
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail";
import BlogPageAdmin from "./pages/BlogPageAdmin/BlogPageAdmin";


function App() {
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);

  const toggleLoginPopup = () => {
    setIsLoginPopupOpen(!isLoginPopupOpen);
  };

  const toggleRegisterPopup = () => {
    setIsRegisterPopupOpen(!isRegisterPopupOpen);
  };

  return (
    <Router>
      <div className="App">
        <Navbar
          toggleLoginPopup={toggleLoginPopup}
          toggleRegisterPopup={toggleRegisterPopup}
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/verify" element={<VerifyEmail />} />
          <Route path="/BlogAdmin" element={<BlogPageAdmin />} />
        </Routes>
        <LoginPopup isOpen={isLoginPopupOpen} onClose={toggleLoginPopup} />
        <RegisterPopup isOpen={isRegisterPopupOpen} onClose={toggleRegisterPopup} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;