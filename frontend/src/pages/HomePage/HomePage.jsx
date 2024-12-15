// frontend/src/pages/HomePage/HomePage.jsx
import React, { useState } from 'react';
import LoginPopup from '../../components/LoginPopup/LoginPopup';

function HomePage() {
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

  const handleOpenLoginPopup = () => {
    setIsLoginPopupOpen(true);
  };

  const handleCloseLoginPopup = () => {
    setIsLoginPopupOpen(false);
  };

  return (
    <div>
      <button onClick={handleOpenLoginPopup}>Đăng nhập</button>

      <LoginPopup isOpen={isLoginPopupOpen} onClose={handleCloseLoginPopup} />
    </div>
  );
}

export default HomePage;