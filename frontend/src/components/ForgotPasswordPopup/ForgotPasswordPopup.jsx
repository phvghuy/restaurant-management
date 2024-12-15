//frontend/src/components/ForgotPasswordPopup/ForgotPasswordPopup.jsx
import React, { useState } from 'react';
import styles from './ForgotPasswordPopup.module.css'; // Tạo file CSS tương ứng
import { forgotPassword } from '../../redux/apiRequest'; // Import hàm forgotPassword từ apiRequest.js
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPopup = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Gọi API forgotPassword
    forgotPassword(email, dispatch, navigate); 
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.popup}>
      <div className={styles.popupInner}>
        <div className={styles.header}>
          <h2 className={styles.title}>Quên mật khẩu</h2>
          <button className={styles.closeButton} onClick={onClose}>
            X
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email của bạn"
              className={styles.inputField}
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Gửi
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPopup;