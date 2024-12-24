import React, { useState, useEffect } from 'react';
import styles from './LoginPopup.module.css';
import { loginUser, resendVerificationEmail } from '../../redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function LoginPopup({ isOpen, onClose, onForgotPassword }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showVerifyButton, setShowVerifyButton] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const error = useSelector((state) => state.auth.login.error);
  const isFetching = useSelector((state) => state.auth.login.isFetching);

  useEffect(() => {
    if (error) {
      // Hiển thị thông báo lỗi dựa trên mã lỗi
      switch (error.code) {
        case 'USERNAME_NOT_FOUND':
          setErrorMessage('Tên đăng nhập không tồn tại.');
          setShowVerifyButton(false);
          break;
        case 'INVALID_PASSWORD':
          setErrorMessage('Mật khẩu không đúng.');
          setShowVerifyButton(false);
          break;
        case 'EMAIL_NOT_VERIFIED':
          setErrorMessage(error.message);
          setShowVerifyButton(true);
          break;
        case 'NETWORK_ERROR':
        case 'INTERNAL_SERVER_ERROR':
          setErrorMessage(error.message);
          setShowVerifyButton(false);
          break;
        default:
          setErrorMessage('Đã có lỗi xảy ra.');
          setShowVerifyButton(false);
          break;
      }
    } else {
      setErrorMessage('');
      setShowVerifyButton(false);
    }
  }, [error]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    // Xóa thông báo lỗi khi người dùng bắt đầu nhập
    setErrorMessage('');
    setShowVerifyButton(false);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    // Xóa thông báo lỗi khi người dùng bắt đầu nhập
    setErrorMessage('');
    setShowVerifyButton(false);
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
    loginUser(newUser, dispatch, navigate)
      .then(() => {
        // Đóng popup chỉ khi đăng nhập thành công
        onClose();
      })
      .catch(() => {});
  };

  const handleResendVerification = async () => {
    try {
      const message = await resendVerificationEmail({ email: username });
      alert(message);
    } catch (error) {
      alert(error);
    }
  };

  const handleForgotPasswordClick = () => {
    onClose();
    onForgotPassword();
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

          {/* Hiển thị thông báo lỗi */}
          {errorMessage && (
            <p className={`${styles.errorMessage} ${styles.errorText}`}>
              {errorMessage}
            </p>
          )}

          {/* Hiển thị nút gửi lại email xác minh */}
          {showVerifyButton && (
            <button
              type="button"
              onClick={handleResendVerification}
              className={styles.verifyButton}
            >
              Gửi lại email xác minh
            </button>
          )}

          <button type="submit" className={styles.submitButton} disabled={isFetching}>
            {isFetching ? 'Đang xử lý...' : 'Đăng nhập'}
          </button>
          <p className={styles.registerLink}>
            Bạn chưa có tài khoản? <a href="/register">Đăng ký ngay</a>
          </p>
          <div className={styles.forgotPassword}>
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