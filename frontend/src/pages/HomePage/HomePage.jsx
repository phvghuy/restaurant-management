// frontend/src/pages/HomePage/HomePage.jsx
import React, { useState } from 'react';
import LoginPopup from '../../components/LoginPopup/LoginPopup';
<<<<<<< HEAD

function HomePage() {
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

  const handleOpenLoginPopup = () => {
    setIsLoginPopupOpen(true);
=======
import RegisterPopup from '../../components/RegisterPopup/RegisterPopup';
import ForgotPasswordPopup from '../../components/ForgotPasswordPopup/ForgotPasswordPopup'; // Import ForgotPasswordPopup

function HomePage() {
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false); // Thêm state cho ForgotPasswordPopup

  const handleOpenLoginPopup = () => {
    setIsLoginPopupOpen(true);
    setShowForgotPassword(false); // Đảm bảo ForgotPasswordPopup đóng khi mở LoginPopup
>>>>>>> develop
  };

  const handleCloseLoginPopup = () => {
    setIsLoginPopupOpen(false);
  };

<<<<<<< HEAD
  return (
    <div>
      <button onClick={handleOpenLoginPopup}>Đăng nhập</button>

      <LoginPopup isOpen={isLoginPopupOpen} onClose={handleCloseLoginPopup} />
    </div>
  );
=======
  const handleOpenRegisterPopup = () => {
    setIsRegisterPopupOpen(true);
  };

  const handleCloseRegisterPopup = () => {
    setIsRegisterPopupOpen(false);
  };

  const handleOpenForgotPassword = () => {
    setShowForgotPassword(true);
    setIsLoginPopupOpen(false); // Đảm bảo LoginPopup đóng khi mở ForgotPasswordPopup
  };

  const handleCloseForgotPassword = () => {
    setShowForgotPassword(false);
  };

  return (
    <div>
      <button onClick={handleOpenLoginPopup}>Đăng nhập</button>
      <button onClick={handleOpenRegisterPopup}>Đăng ký</button>

      <LoginPopup 
        isOpen={isLoginPopupOpen} 
        onClose={handleCloseLoginPopup} 
        onForgotPassword={handleOpenForgotPassword} // Truyền hàm mở ForgotPasswordPopup xuống
      />
      <RegisterPopup
        isOpen={isRegisterPopupOpen}
        onClose={handleCloseRegisterPopup}
      />
      <ForgotPasswordPopup 
        isOpen={showForgotPassword} 
        onClose={handleCloseForgotPassword} 
      />
    </div>
  );

 
>>>>>>> develop
}

export default HomePage;