//frontend/src/components/LoginPopup/LoginPopup.jsx
import React, { useState } from 'react';
import styles from './LoginPopup.module.css';
import { loginUser } from '../../redux/apiRequest';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function LoginPopup({ isOpen, onClose, onForgotPassword }) {
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

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <div className={styles.header}>
          <h2>Đăng nhập</h2>
          <button className={styles.closeButton} onClick={onClose}>
            X
          </button>
        </div>
        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Tài khoản</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Tài khoản"
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
              placeholder="Mật khẩu"
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
          <div className={styles.forgotPassword}>
            {/* Nút để gọi handleForgotPasswordClick */}
            <a href="#" onClick={handleForgotPasswordClick}>
              Quên mật khẩu?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPopup;