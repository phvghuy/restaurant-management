//frontend/src/pages/ResetPassword/ResetPassword.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../redux/apiRequest'; // Import hàm resetPassword
import { useDispatch } from 'react-redux';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(''); // Thông báo lỗi/thành công
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!email || !token) {
      navigate('/'); // Chuyển hướng về trang chủ nếu không có email và token
    }
  }, [email, token, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Mật khẩu và xác nhận mật khẩu không khớp!');
      return;
    }
    
    // Gọi API resetPassword
    resetPassword({ email, token, password }, dispatch, navigate, setMessage);
  };

  return (
    <div>
      <h2>Đặt lại mật khẩu</h2>
      <form onSubmit={handleSubmit}>
        <input type="hidden" value={email} />
        <input type="hidden" value={token} />
        <div>
          <label htmlFor="password">Mật khẩu mới:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Xác nhận mật khẩu mới:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {message && <p>{message}</p>}
        <button type="submit">Đặt lại mật khẩu</button>
      </form>
    </div>
  );
};

export default ResetPassword;