import React from 'react';
import { useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const location = useLocation();
    const currentPage = location.pathname.replace('/', '') || 'home';
    return (
        <header className="navbar-container">
            <div className="navbar">
                {/* Logo */}
                <div className="navbar-logo">
                    <img src="/logo.png" alt="AJIMAZING Logo" />
                </div>
                {/* Navigation Links */}
                <nav className="navbar-links">
                    <ul>
                    <li><a href="/" className={currentPage === 'home' ? 'active' : ''}>TRANG CHỦ</a></li>
                        <li><a href="/menu" className={currentPage === 'menu' ? 'active' : ''}>THỰC ĐƠN</a></li>
                        <li><a href="/reservation" className={currentPage === 'reservation' ? 'active' : ''}>ĐẶT BÀN</a></li>
                        <li><a href="/blog" className={currentPage === 'blog' ? 'active' : ''}>TIN TỨC</a></li>
                        <li><a href="/contact" className={currentPage === 'contact' ? 'active' : ''}>LIÊN HỆ</a></li>
                    </ul>
                </nav>
                {/* Search and Buttons */}
                <div className="navbar-actions">
                    <input type="text" placeholder="Tìm kiếm" className="navbar-search" />
                    <button className="navbar-login">Đăng nhập</button>
                    <button className="navbar-register">Đăng ký</button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
