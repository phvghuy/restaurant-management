// frontend/src/pages/HomePage/HomePage.jsx
import React, { useState } from 'react';
import LoginPopup from '../../components/LoginPopup/LoginPopup';
import RegisterPopup from '../../components/RegisterPopup/RegisterPopup';

function HomePage() {
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);

  const handleOpenLoginPopup = () => {
    setIsLoginPopupOpen(true);
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


  return (
    <div>
      <button onClick={handleOpenLoginPopup}>Đăng nhập</button>
      <button onClick={handleOpenRegisterPopup}>Đăng ký</button>

      <LoginPopup isOpen={isLoginPopupOpen} onClose={handleCloseLoginPopup} />
      <RegisterPopup
        isOpen={isRegisterPopupOpen}
        onClose={handleCloseRegisterPopup}
      />
    </div>
  );

 
}

export default HomePage;