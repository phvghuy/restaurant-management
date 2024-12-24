//frontend/src/components/Navbar/Navbar.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import './Navbar.css';
import { useSelector } from 'react-redux';

const Navbar = ({ toggleLoginPopup, toggleRegisterPopup }) => {
    const location = useLocation();
    const currentPage = location.pathname.replace('/', '') || 'home';
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    return (
        <header className="navbar-container">
            <div className="navbar">
                {/* Logo */}
                <a className="navbar-logo" href='/'>
                    <img src="/logo.png" alt="AJIMAZING Logo" />
                </a>
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
                    {currentUser ? (
                        // Nếu đã đăng nhập, hiển thị tên người dùng
                        <div className="navbar-user">
                            <span>Xin chào, {currentUser.username}</span>
                            {/* Thêm nút đăng xuất ở đây nếu cần */}
                        </div>
                    ) : (
                        // Nếu chưa đăng nhập, hiển thị nút đăng nhập/đăng ký
                        <>
                            <button className="navbar-login" onClick={toggleLoginPopup}>
                                Đăng nhập
                            </button>
                            <button className="navbar-register" onClick={toggleRegisterPopup}>
                                Đăng ký
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;