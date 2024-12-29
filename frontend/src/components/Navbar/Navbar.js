import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useSelector } from "react-redux";

const Navbar = ({ toggleLoginPopup, toggleRegisterPopup }) => {
  const location = useLocation();
  const currentPage = location.pathname.replace("/", "") || "home";
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // TODO: Xử lý logic đăng xuất ở đây (xóa token, cập nhật state, v.v.)
    console.log("Đăng xuất");
    setIsDropdownOpen(false);
    // Sau khi đăng xuất, có thể bạn muốn navigate về trang chủ
    navigate("/");
  };

  return (
    <header className="navbar-container">
      <div className="navbar">
        <a className="navbar-logo" href="/">
          <img src="/logo.png" alt="AJIMAZING Logo" />
        </a>
        <nav className="navbar-links">
          <ul>
            <li>
              <Link to="/" className={currentPage === "home" ? "active" : ""}>
                TRANG CHỦ
              </Link>
            </li>
            <li>
              <Link to="/menu" className={currentPage === "menu" ? "active" : ""}>
                THỰC ĐƠN
              </Link>
            </li>
            <li>
              {currentUser ? (
                currentUser.admin ? (
                  <Link
                    to="/reservation-admin"
                    className={
                      currentPage === "reservation-admin" ? "active" : ""
                    }
                  >
                    ĐẶT BÀN
                  </Link>
                ) : (
                  <Link
                    to="/reservation"
                    className={currentPage === "reservation" ? "active" : ""}
                  >
                    ĐẶT BÀN
                  </Link>
                )
              ) : (
                <Link
                  to="/login"
                  className={currentPage === "reservation" ? "active" : ""}
                >
                  ĐẶT BÀN
                </Link>
              )}
            </li>
            <li>
              <Link
                to="/blog"
                className={currentPage === "blog" ? "active" : ""}
              >
                TIN TỨC
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={currentPage === "contact" ? "active" : ""}
              >
                LIÊN HỆ
              </Link>
            </li>
          </ul>
        </nav>
        <div className="navbar-actions">
          {currentUser ? (
            <div className="navbar-user" onClick={toggleDropdown}>
              <div className="user-info">
                <span className="username">
                  Xin chào, {currentUser.username}!
                </span>
                <img
                  src="/images/default-avatar.png"
                  alt="User Avatar"
                  className="user-avatar"
                />
                {isDropdownOpen && (
                  <div className="dropdown-menu">
                    <ul>
                      {currentUser.admin ? (
                        <>
                          <li>
                            <Link to="/admin-account">Quản lý tài khoản</Link>
                          </li>
                          <li>
                            <button onClick={handleLogout}>Đăng xuất</button>
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <Link to="/profile">Thông tin tài khoản</Link>
                          </li>
                          <li>
                            <Link to="/check-reservations">
                              Kiểm tra lịch sử đặt bàn
                            </Link>
                          </li>
                          <li>
                            <button onClick={handleLogout}>Đăng xuất</button>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                )}
              </div>
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