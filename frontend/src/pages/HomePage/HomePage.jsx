// frontend/src/pages/HomePage/HomePage.jsx
import React, { useState } from 'react';
import LoginPopup from '../../components/LoginPopup/LoginPopup';
import RegisterPopup from '../../components/RegisterPopup/RegisterPopup';
import ForgotPasswordPopup from '../../components/ForgotPasswordPopup/ForgotPasswordPopup'; // Import ForgotPasswordPopup

function HomePage() {
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false); // Thêm state cho ForgotPasswordPopup

  const handleOpenLoginPopup = () => {
    setIsLoginPopupOpen(true);
    setShowForgotPassword(false); // Đảm bảo ForgotPasswordPopup đóng khi mở LoginPopup
  };

  const handleCloseLoginPopup = () => {
    setIsLoginPopupOpen(false);
  };

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

 
}

export default HomePage;