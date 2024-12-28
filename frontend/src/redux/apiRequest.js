//frontend/redux/apiRequest.js
import axios from "axios";
import { loginFailed, loginStart, loginSuccess, registerStart, registerFailed, registerSuccess } from "./authSlice";
import { getBlogsFailed, getBlogStart, getBlogSuccess } from "./blogSlice";
import { createBlogFailed, createBlogStart, createBlogSuccess } from "./blogSlice";

// user: Thông tin người dùng cần để đăng nhập (ví dụ: username, password).
// dispatch: Hàm dispatch của Redux, được sử dụng để gửi các actions đến store.
// navigate: Hàm navigate từ react-router-dom (hoặc thư viện tương tự), được sử dụng để chuyển hướng trang.
export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("/v1/auth/login", user);
    dispatch(loginSuccess(res.data));
    // Kiểm tra nếu là admin thì chuyển hướng đến /BlogAdmin
    if (res.data.admin) {
      navigate("/BlogAdmin");
    } else {
      navigate("/");
    }
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

export const getAllBlogs = async (accessToken, dispatch) => {
  dispatch(getBlogStart());
  try {
    const url = accessToken ? '/v1/blogs/admin' : '/v1/blogs'; // Chọn URL dựa trên accessToken
    const headers = accessToken ? { token: `Bearer ${accessToken}` } : {};
    const res = await axios.get(url, { headers });
    dispatch(getBlogSuccess(res.data));
  } catch (err) {
    dispatch(getBlogsFailed());
  }
};

export const createBlog = async (blog, accessToken, dispatch, onSuccess) => {
  dispatch(createBlogStart());
  try {
    const res = await axios.post('/v1/blogs', blog, {
      headers: {
        'Content-Type': 'multipart/form-data',
        token: `Bearer ${accessToken}`,
      },
    });
    console.log("Response from server:", res);
    if (res.status === 201) {
      dispatch(createBlogSuccess(res.data));
      if (onSuccess) {
        onSuccess();
      }
      return Promise.resolve(res.data);
    } else {
      dispatch(createBlogFailed());
      alert(res.data.message || 'Failed to create blog.');
      return Promise.reject(res.data.message || 'Failed to create blog.');
    }
  } catch (err) {
    console.error("Error creating blog:", err.response || err);
    dispatch(createBlogFailed());
    if (err.response) {
      alert(err.response.data.message || 'Failed to create blog.');
      return Promise.reject(err.response.data.message || 'Failed to create blog.');
    } else {
      alert('Network error or server error.');
      return Promise.reject('Network error or server error.');
    }
  }
};

export const deleteBlog = async (postId, accessToken, dispatch) => {
  try {
    await axios.delete(`/v1/blogs/${postId}`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    // Không cần dispatch action ở đây vì ta sẽ cập nhật danh sách blog ở BlogPageAdmin
    return Promise.resolve();
  } catch (err) {
    console.error("Delete blog error:", err);
    return Promise.reject(err);
  }
};

export const updateBlog = async (postId, updatedBlog, accessToken, dispatch, onSuccess) => {
  try {
    const res = await axios.put(`/v1/blogs/${postId}`, updatedBlog, {
      headers: { token: `Bearer ${accessToken}` },
    });
    if (onSuccess) {
      onSuccess();
    }
    return Promise.resolve(res.data);
  } catch (err) {
    console.error("Update blog error:", err);
    return Promise.reject(err);
  }
};