// frontend/src/pages/ResetPassword/ResetPassword.js
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../redux/apiRequest';
import { useDispatch } from 'react-redux';
import styles from './ResetPassword.module.css'; 

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const emailFromParams = searchParams.get('email');
    const tokenFromParams = searchParams.get('token');

    if (!emailFromParams || !tokenFromParams) {
      navigate('/'); // Chuyển hướng về trang chủ nếu không có email và token
    } else {
        setEmail(emailFromParams)
    }
  }, [searchParams, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = searchParams.get('token');
    // Kiểm tra input trống
    if (!password) {
      setMessage('Vui lòng nhập mật khẩu mới!');
      return;
    }
    if (!confirmPassword) {
      setMessage('Vui lòng nhập xác nhận mật khẩu!');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Mật khẩu và xác nhận mật khẩu không khớp!');
      return;
    }

    // Gọi API resetPassword
    resetPassword({ email, token, password }, dispatch, navigate, setMessage);
  };

  return (
    <div className={styles.container}> 
      <div className={styles.formContainer}> 
        <h2 className={styles.title}>Đặt lại mật khẩu</h2> 
        <p className={styles.userInfo}>Email: {email}</p> 
        <form onSubmit={handleSubmit} className={styles.form}> 
          <div className={styles.inputGroup}> 
            <label htmlFor="password">Mật khẩu mới:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input} 
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword">Xác nhận mật khẩu:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles.input} 
            />
          </div>
          {message && <p className={styles.message}>{message}</p>}
          <button type="submit" className={styles.button}> 
            Đặt lại mật khẩu
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;