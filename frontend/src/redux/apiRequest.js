//frontend/redux/apiRequest.js
import axios from "axios";
import { loginFailed, loginStart, loginSuccess, registerStart, registerFailed, registerSuccess } from "./authSlice";

// user: Thông tin người dùng cần để đăng nhập (ví dụ: username, password).
// dispatch: Hàm dispatch của Redux, được sử dụng để gửi các actions đến store.
// navigate: Hàm navigate từ react-router-dom (hoặc thư viện tương tự), được sử dụng để chuyển hướng trang.
export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("/v1/auth/login", user);
    dispatch(loginSuccess(res.data));
    navigate("/");
    return Promise.resolve();
  } catch (err) {
    console.error("Login error:", err);
    if (err.response && err.response.data) {
      // Sửa lỗi dispatch loginFailed
      dispatch(loginFailed({
          code: err.response.data.code,
          message: err.response.data.message,
      }));
    } else {
      dispatch(loginFailed({
          code: "NETWORK_ERROR",
          message: "Đã có lỗi xảy ra. Vui lòng thử lại sau.",
      }));
    }
    return Promise.reject();
  }
};


export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    const res = await axios.post("/v1/auth/register", user);
    // Xử lý response từ BE
    if (res.data.message) {
        // Nếu BE trả về message, hiển thị thông báo cho người dùng
        alert(res.data.message);
    } else {
        // Xử lý trường hợp BE không trả về message (nếu có)
        console.error("Unexpected response from server:", res);
        dispatch(registerFailed());
    }
    dispatch(registerSuccess());
  } catch (err) {
    console.error("Registration error:", err);
    if (err.response && err.response.data && err.response.data.error) {
        alert(err.response.data.error);
    }
    dispatch(registerFailed());
  }
};

export const forgotPassword = async (email, dispatch, navigate) => {
  // Không cần dispatch start, failed vì không có reducer cho forgotPassword
  try {
    const res = await axios.post('/v1/auth/forgot-password', { email });
    // Hiển thị thông báo cho người dùng, ví dụ dùng alert:
    alert(res.data.message); 
    // Hoặc bạn có thể dùng một component thông báo khác
  } catch (err) {
    console.error('Forgot password error:', err);
    // Hiển thị lỗi nếu có
    if (err.response && err.response.data && err.response.data.error) {
        alert(err.response.data.error);
    }
  }
};
  
export const resetPassword = async ({ email, token, password }, dispatch, navigate, setMessage) => {
  // Không cần dispatch start, failed vì không có reducer cho resetPassword
  try {
    const res = await axios.post('/v1/auth/reset-password', { email, token, password });
    // Hiển thị thông báo thành công
    setMessage(res.data.message);
    // Chuyển hướng về trang đăng nhập sau 2s
    setTimeout(() => {
      navigate('/');
    }, 2000);
  } catch (err) {
    console.error('Reset password error:', err);
    // Hiển thị lỗi
    if (err.response && err.response.data && err.response.data.error) {
      setMessage(err.response.data.error);
    } else {
      setMessage('Đã có lỗi xảy ra, vui lòng thử lại sau.');
    }
  }
};

export const resendVerificationEmail = async (email) => {
  try {
    const res = await axios.post('/v1/auth/resend-verification-email', { email });
    return res.data;
  } catch (err) {
    console.error('Resend verification email error:', err);
    throw err; // Re-throw the error to be handled by the caller
  }
};