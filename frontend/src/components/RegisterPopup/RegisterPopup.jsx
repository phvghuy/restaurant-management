import React, { useState } from 'react';
import styles from './RegisterPopup.module.css';
import { registerUser } from '../../redux/apiRequest';
import { useDispatch} from "react-redux";
import { useNavigate} from "react-router-dom";

const RegisterPopup = ({ isOpen, onClose }) => {
  // Các state để lưu thông tin người dùng nhập vào
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [receivePromotions, setReceivePromotions] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Mật khẩu và xác nhận mật khẩu không khớp!");
      return;
  }
  
    const newUser = {
      email: email,
      password: password,
      username: username,
      fullName: fullName,
      phoneNumber: phoneNumber,
    };

    registerUser(newUser, dispatch, navigate);

    onClose(); // Đóng popup sau khi submit (tạm thời)
  };

  if (!isOpen) return null; // Ẩn popup nếu isOpen là false

  return (
    <div className={styles.popup}>
      <div className={styles.popupInner}>
        <div className={styles.header}>
          <h2 className={styles.title}>Đăng ký thông tin mới</h2>
          <button className={styles.closeButton} onClick={onClose}>
            X
          </button>
        </div>
        <p className={styles.subtitle}>
          Đăng ký thông tin để đặt dịch vụ nhanh hơn cho lần sau!
        </p>
        <form onSubmit={handleSubmit}>
          {/* Phần 1: Các ô input */}
          <div className={styles.inputSection}>
            <div className={styles.formGroup}>
              <label htmlFor="username">Tài khoản</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Tài khoản"
                className={styles.inputField}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">Mật khẩu</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mật khẩu"
                className={styles.inputField}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Xác nhận mật khẩu"
                className={styles.inputField}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="fullName">Họ và tên</label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Họ và tên"
                className={styles.inputField}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="phoneNumber">Số điện thoại</label>
              <input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Số điện thoại"
                className={styles.inputField}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className={styles.inputField}
              />
            </div>
          </div>

          {/* Phần 2: Checkbox và nút Đăng ký */}
          <div className={styles.actionSection}>
            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="agreeTerms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />
              <label htmlFor="agreeTerms">
                Tôi đồng ý với{' '}
                <a href="#" className={styles.link}>
                  Điều khoản dịch vụ
                </a>{' '}
                và{' '}
                <a href="#" className={styles.link}>
                  Chính sách bảo mật
                </a>
              </label>
            </div>
            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="receivePromotions"
                checked={receivePromotions}
                onChange={(e) => setReceivePromotions(e.target.checked)}
              />
              <label htmlFor="receivePromotions">
                Gửi cho tôi thông báo khuyến mãi mới nhất
              </label>
            </div>
            <button type="submit" className={styles.submitButton}>
              Đăng ký ngay
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPopup;