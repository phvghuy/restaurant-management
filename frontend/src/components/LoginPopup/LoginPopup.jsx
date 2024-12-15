<<<<<<< HEAD
import React, { useState } from 'react';
import styles from './LoginPopup.module.css';
import { loginUser } from '../../redux/apiRequest';
import { useDispatch} from "react-redux";
import { useNavigate} from "react-router-dom";

function LoginPopup({ isOpen, onClose }) {
=======
//frontend/src/components/LoginPopup/LoginPopup.jsx
import React, { useState } from 'react';
import styles from './LoginPopup.module.css';
import { loginUser } from '../../redux/apiRequest';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function LoginPopup({ isOpen, onClose, onForgotPassword }) {
>>>>>>> develop
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const handleLogin = (event) => {
<<<<<<< HEAD
    // Ngăn tải lại trang (khi nhấn đăng nhập không tải lại trang)
    event.preventDefault();
    // Xử lý logic đăng nhập ở đây (gọi API, kiểm tra thông tin, v.v.)
    const newUser = {
        username: username,
        password: password,
    };
    loginUser(newUser, dispatch, navigate);

    // Sau khi xử lý đăng nhập thành công, đóng popup
    onClose();
  };

=======
    event.preventDefault();
    const newUser = {
      username: username,
      password: password,
    };
    loginUser(newUser, dispatch, navigate);
    onClose();
  };

  const handleForgotPasswordClick = () => {
    onClose(); // Đóng popup đăng nhập
    onForgotPassword(); // Mở popup quên mật khẩu (hàm này được truyền từ HomePage)
  };

>>>>>>> develop
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <div className={styles.header}>
<<<<<<< HEAD
            <h2>Đăng nhập</h2>
            <button className={styles.closeButton} onClick={onClose}>
            ×
            </button>
        </div>
        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Tên người dùng</label>
=======
          <h2>Đăng nhập</h2>
          <button className={styles.closeButton} onClick={onClose}>
            X
          </button>
        </div>
        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Tài khoản</label>
>>>>>>> develop
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleUsernameChange}
<<<<<<< HEAD
              placeholder='Tên người dùng'
=======
              placeholder="Tài khoản"
>>>>>>> develop
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
<<<<<<< HEAD
              placeholder='Mật khẩu'
=======
              placeholder="Mật khẩu"
>>>>>>> develop
              className={styles.input}
            />
          </div>
          <div className={styles.rememberMe}>
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
            <label htmlFor="rememberMe">Ghi nhớ đăng nhập</label>
          </div>
          <button type="submit" className={styles.submitButton}>
            Đăng nhập
          </button>
          <p className={styles.registerLink}>
            Bạn chưa có tài khoản? <a href="/register">Đăng ký ngay</a>
          </p>
<<<<<<< HEAD
=======
          <div className={styles.forgotPassword}>
            {/* Nút để gọi handleForgotPasswordClick */}
            <a href="#" onClick={handleForgotPasswordClick}>
              Quên mật khẩu?
            </a>
          </div>
>>>>>>> develop
        </form>
      </div>
    </div>
  );
}

export default LoginPopup;