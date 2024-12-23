import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/authSlice';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = searchParams.get('email');
  const token = searchParams.get('token');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`/v1/auth/verify?email=${email}&token=${token}`);
        console.log(response.data);

        // Dispatch action loginSuccess with the verified user data
        dispatch(loginSuccess(response.data.user));

        // Chuyển hướng ngay lập tức về trang chủ
        navigate('/');
      } catch (error) {
        console.error(error);
        // Chuyển hướng về trang chủ ngay cả khi lỗi
        navigate('/');
      }
    };

    if (email && token) {
      verifyEmail();
    }
  }, [email, token, dispatch, navigate]);

  return null; // Không render bất cứ nội dung gì
};

export default VerifyEmail;