import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const currentUser = useSelector((state) => state.auth.login.currentUser);

  if (!currentUser) {
    // Chưa đăng nhập, chuyển hướng về trang chủ
    return <Navigate to="/" />;
  }

  if (!currentUser.admin) {
    // Không phải admin, chuyển hướng về trang chủ
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;