//frontend/src/App.js
import HomePage from "./pages/HomePage/HomePage";
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Blog from "./pages/BlogPage/Blog";
import MenuPage from "./pages/MenuPage/MenuPage";
import Contact from "./pages/Contact/Contact";
import Navbar from "./components/Navbar/Navbar";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import RegisterPopup from "./components/RegisterPopup/RegisterPopup";
import ForgotPasswordPopup from "./components/ForgotPasswordPopup/ForgotPasswordPopup";
import { useState } from "react";
import Footer from "./components/Footer/Footer";
import ResetPassword from './pages/ResetPassword/ResetPassword';
import Reservation from "./pages/Reservation/Reservation";
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail";
import BlogPageAdmin from "./pages/BlogPageAdmin/BlogPageAdmin";
import CustomerAdmin from "./pages/CustomerAdmin/CustomerAdmin";
import Employeemanager from "./pages/Employeemanager/Employeemanager";
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import ReservationAdmin from "./pages/ReservationAdmin/ReservationAdmin";

function App() {
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [isForgotPasswordPopupOpen, setIsForgotPasswordPopupOpen] = useState(false); 

  const toggleLoginPopup = () => {
    setIsLoginPopupOpen(!isLoginPopupOpen);
  };

  const toggleRegisterPopup = () => {
    setIsRegisterPopupOpen(!isRegisterPopupOpen);
  };

  const toggleForgotPasswordPopup = () => {
    setIsForgotPasswordPopupOpen(!isForgotPasswordPopupOpen);
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
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify" element={<VerifyEmail />} />
          <Route path="/CustomerAdmin" element={<CustomerAdmin />} />
          <Route path="/Employeemanager" element={<Employeemanager />} />
          <Route
            path="/BlogAdmin"
            element={
              <PrivateRoute>
                <BlogPageAdmin />
              </PrivateRoute>
            }
          />
          <Route
            path="/reservation-admin"
            element={
              <PrivateRoute>
                <ReservationAdmin />
              </PrivateRoute>
            }
          />
  <Route
    path="/BlogAdmin"
    element={
      <PrivateRoute>
        <BlogPageAdmin />
      </PrivateRoute>
    }
  />
          <Route path="/reservation-admin" element={<ReservationAdmin />} />
          
        </Routes>
        <LoginPopup
          isOpen={isLoginPopupOpen}
          onClose={toggleLoginPopup}
          onForgotPassword={toggleForgotPasswordPopup}
        />
        <RegisterPopup isOpen={isRegisterPopupOpen} onClose={toggleRegisterPopup} />
        <ForgotPasswordPopup
          isOpen={isForgotPasswordPopupOpen}
          onClose={toggleForgotPasswordPopup}
        />
        <Footer />
      </div>
    </Router>
  );
}

export default App;