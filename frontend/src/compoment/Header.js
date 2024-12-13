import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">ACME</div>
      <nav className="navbar">
        <a href="#about">Về Chúng Tôi</a>
        <a href="#menu">Thực Đơn</a>
        <a href="#booking">Đặt Bàn</a>
        <a href="#news">Tin Tức</a>
        <a href="#contact">Liên Hệ</a>
      </nav>
      <div className="auth-buttons">
        <button className="login-btn">Đăng nhập</button>
        <button className="register-btn">Đăng ký</button>
      </div>
    </header>
  );
}

export default Header;
