//frontend/src/components/RegisterPopup/RegisterPopup.jsx
import React, { useState } from "react";
import styles from "./RegisterPopup.module.css";
import { registerUser } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const RegisterPopup = ({ isOpen, onClose }) => {
  // Các state để lưu thông tin người dùng nhập vào
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const fields = [
      { value: username, message: "Vui lòng nhập tài khoản!" },
      { value: password, message: "Vui lòng nhập mật khẩu!" },
      { value: confirmPassword, message: "Vui lòng nhập xác nhận mật khẩu!" },
      {
        value: password === confirmPassword,
        message: "Mật khẩu và xác nhận mật khẩu không khớp!",
        skip: password !== confirmPassword,
      },
      { value: fullName, message: "Vui lòng nhập họ và tên!" },
      { value: phoneNumber, message: "Vui lòng nhập số điện thoại!" },
      { value: email, message: "Vui lòng nhập email!" },
      {
        value: agreeTerms,
        message:
          "Vui lòng đồng ý với Điều khoản dịch vụ và Chính sách bảo mật!",
      },
    ];

    for (const field of fields) {
      if (field.skip) continue;
      if (!field.value) {
        setError(field.message);
        return;
      }
    }

    // Nếu tất cả các trường hợp lệ, tạo newUser và gọi API
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
        <form onSubmit={handleSubmit}>
          {/* Phần 1: Các ô input */}
          <div className={styles.inputSection}>
            <div className={styles.formGroup}>
              <label htmlFor="username">Tài khoản</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError(""); // Xóa error khi người dùng nhập liệu
                }}
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
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(""); // Xóa error khi người dùng nhập liệu
                }}
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
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError(""); // Xóa error khi người dùng nhập liệu
                }}
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
                onChange={(e) => {
                  setFullName(e.target.value);
                  setError(""); // Xóa error khi người dùng nhập liệu
                }}
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
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  setError(""); // Xóa error khi người dùng nhập liệu
                }}
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
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(""); // Xóa error khi người dùng nhập liệu
                }}
                placeholder="Email"
                className={styles.inputField}
              />
            </div>
            {/* Hiển thị lỗi nếu có */}
            {error && <div className={styles.error}>{error}</div>}
          </div>

          {/* Phần 2: Checkbox và nút Đăng ký */}
          <div className={styles.actionSection}>
            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="agreeTerms"
                checked={agreeTerms}
                onChange={(e) => {
                  setAgreeTerms(e.target.checked);
                  setError("");
                }}
              />
              <label htmlFor="agreeTerms">
                Tôi đồng ý với{" "}
                <a href="#" className={styles.link}>
                  Điều khoản dịch vụ
                </a>{" "}
                và{" "}
                <a href="#" className={styles.link}>
                  Chính sách bảo mật
                </a>
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