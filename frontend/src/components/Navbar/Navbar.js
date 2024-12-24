// frontend/src/components/Navbar/Navbar.js
import React from 'react';
import { useLocation, Link } from 'react-router-dom'; // Thay thế a bằng Link
import './Navbar.css';
import { useSelector } from 'react-redux';

const Navbar = ({ toggleLoginPopup, toggleRegisterPopup }) => {
    const location = useLocation();
    const currentPage = location.pathname.replace('/', '') || 'home';
    const currentUser = useSelector((state) => state.auth.login.currentUser); // Theo dõi currentUser

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
                        {/* Thay thế thẻ <a> bằng <Link> */}
                        <li><Link to="/" className={currentPage === 'home' ? 'active' : ''}>TRANG CHỦ</Link></li>
                        <li><Link to="/menu" className={currentPage === 'menu' ? 'active' : ''}>THỰC ĐƠN</Link></li>
                        <li><Link to="/reservation" className={currentPage === 'reservation' ? 'active' : ''}>ĐẶT BÀN</Link></li>
                        <li><Link to="/blog" className={currentPage === 'blog' ? 'active' : ''}>TIN TỨC</Link></li>
                        <li><Link to="/contact" className={currentPage === 'contact' ? 'active' : ''}>LIÊN HỆ</Link></li>
                    </ul>
                </nav>
                {/* Search and Buttons */}
                <div className="navbar-actions">
                    <input type="text" placeholder="Tìm kiếm" className="navbar-search" />
                    {currentUser ? (
                        <div className="navbar-user">
                            <span>Xin chào, {currentUser.username}</span>
                            {/* Thêm nút đăng xuất ở đây nếu cần */}
                        </div>
                    ) : (
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