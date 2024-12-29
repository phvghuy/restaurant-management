//frontend/src/components/Navbar/Navbar.js
import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css"; 
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/apiRequest";
import { createAxios } from "../../createInstance";
import { logOutSuccess } from "../../redux/authSlice";

const Navbar = ({ toggleLoginPopup, toggleRegisterPopup }) => {
  const location = useLocation();
  const currentPage = location.pathname.replace("/", "") || "home";
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const accessToken = currentUser?.accessToken;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  let axiosJWT = createAxios(currentUser, dispatch, logOutSuccess);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    await logoutUser(dispatch, currentUser.id, accessToken, axiosJWT);
    dispatch(logOutSuccess());
    setIsDropdownOpen(false);
    navigate("/");
  };

  return (
    <header className={styles["navbar-container"]}>
      <div className={styles.navbar}>
        <a
          className={styles["navbar-logo"]}
          href={currentUser?.admin ? "/CustomerAdmin" : "/"}
        >
          <img src="/logo.png" alt="AJIMAZING Logo" />
        </a>
        <nav className={styles["navbar-links"]}>
          <ul>
            <li>
              <Link
                to={currentUser?.admin ? "/CustomerAdmin" : "/"}
                className={currentPage === "home" || currentPage === "CustomerAdmin" ? styles.active : ""}
              >
                TRANG CHỦ
              </Link>
            </li>
            <li>
              <Link
                to="/menu"
                className={currentPage === "menu" ? styles.active : ""}
              >
                THỰC ĐƠN
              </Link>
            </li>
            <li>
              {currentUser ? (
                currentUser.admin ? (
                  <Link
                    to="/reservation-admin"
                    className={
                      currentPage === "reservation-admin" ? styles.active : ""
                    }
                  >
                    ĐẶT BÀN
                  </Link>
                ) : (
                  <Link
                    to="/reservation"
                    className={currentPage === "reservation" ? styles.active : ""}
                  >
                    ĐẶT BÀN
                  </Link>
                )
              ) : (
                <Link
                  to="/reservation"
                  className={currentPage === "reservation" ? styles.active : ""}
                >
                  ĐẶT BÀN
                </Link>
              )}
            </li>
            
            <li>
              {currentUser ? (
                currentUser.admin ? (
                  <Link
                    to="/BlogAdmin"
                    className={
                      currentPage === "BlogAdmin" ? styles.active : ""
                    }
                  >
                    TIN TỨC
                  </Link>
                ) : (
                  <Link
                    to="/blog"
                    className={currentPage === "blog" ? styles.active : ""}
                  >
                    TIN TỨC
                  </Link>
                )
              ) : (
                <Link
                  to="/blog"
                  className={currentPage === "blog" ? styles.active : ""}
                >
                  TIN TỨC
                </Link>
              )}
            </li>

            <li>
              <Link
                to="/contact"
                className={currentPage === "contact" ? styles.active : ""}
              >
                LIÊN HỆ
              </Link>
            </li>
            {/* Thêm mục NHÂN VIÊN nếu là admin */}
            {currentUser?.admin && (
              <li>
                <Link
                  to="/Employeemanager"
                  className={currentPage === "Employeemanager" ? styles.active : ""}
                >
                  NHÂN VIÊN
                </Link>
              </li>
            )}
          </ul>
        </nav>
        <div className={styles["navbar-actions"]}>
          {currentUser ? (
            <div className={styles["navbar-user"]} onClick={toggleDropdown}>
              <div className={styles["user-info"]}>
                <div className={styles["username-container"]}>
                  <span className={styles.username}>
                    Xin chào, {currentUser.username}!
                  </span>
                </div>
                <img
                  src="/images/avatar.png"
                  alt="User Avatar"
                  className={styles["user-avatar"]}
                />
                {isDropdownOpen && (
                  <div className={styles["dropdown-menu"]}>
                    <ul>
                      {currentUser.admin ? (
                        <>
                          <li>
                            <Link to="/admin-info">Quản lý tài khoản</Link>
                          </li>
                          <li>
                            <button onClick={handleLogout}>Đăng xuất</button>
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <Link to="/user-info">Thông tin tài khoản</Link>
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
              <button
                className={styles["navbar-login"]}
                onClick={toggleLoginPopup}
              >
                Đăng nhập
              </button>
              <button
                className={styles["navbar-register"]}
                onClick={toggleRegisterPopup}
              >
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