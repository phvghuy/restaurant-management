//frontend/redux/apiRequest.js
import axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  registerStart,
  registerFailed,
  registerSuccess,
} from "./authSlice";
import {
  getBlogsFailed,
  getBlogStart,
  getBlogSuccess,
  createBlogFailed,
  createBlogStart,
  createBlogSuccess,
} from "./blogSlice";
import {
  getAllReservationsStart,
  getAllReservationsSuccess,
  getAllReservationsFailure,
  createReservationStart,
  createReservationSuccess,
  createReservationFailure,
  deleteReservationStart,
  deleteReservationSuccess,
  deleteReservationFailure,
  updateReservationStart,
  updateReservationSuccess,
  updateReservationFailure,
} from './reservationSlice';

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
    const errorData = err.response
      ? err.response.data
      : {
          code: "NETWORK_ERROR",
          message: "Đã có lỗi xảy ra. Vui lòng thử lại sau.",
        };
    dispatch(loginFailed(errorData));
    return Promise.reject(errorData);
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
    const res = await axios.post("/v1/auth/forgot-password", { email });
    // Hiển thị thông báo cho người dùng, ví dụ dùng alert:
    alert(res.data.message);
    // Hoặc bạn có thể dùng một component thông báo khác
  } catch (err) {
    console.error("Forgot password error:", err);
    // Hiển thị lỗi nếu có
    if (err.response && err.response.data && err.response.data.error) {
      alert(err.response.data.error);
    }
  }
};

export const resetPassword = async (
  { email, token, password },
  dispatch,
  navigate,
  setMessage
) => {
  // Không cần dispatch start, failed vì không có reducer cho resetPassword
  try {
    const res = await axios.post("/v1/auth/reset-password", {
      email,
      token,
      password,
    });
    // Hiển thị thông báo thành công
    setMessage(res.data.message);
    // Chuyển hướng về trang đăng nhập sau 2s
    setTimeout(() => {
      navigate("/");
    }, 2000);
  } catch (err) {
    console.error("Reset password error:", err);
    // Hiển thị lỗi
    if (err.response && err.response.data && err.response.data.error) {
      setMessage(err.response.data.error);
    } else {
      setMessage("Đã có lỗi xảy ra, vui lòng thử lại sau.");
    }
  }
};

export const resendVerificationEmail = async (email) => {
  try {
    const res = await axios.post("/v1/auth/resend-verification-email", {
      email,
    });
    return res.data;
  } catch (err) {
    console.error("Resend verification email error:", err);
    throw err; // Re-throw the error to be handled by the caller
  }
};

export const getAllBlogs = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getBlogStart());
  try {
    let res;
    if (accessToken) {
      // Sử dụng axiosJWT nếu có accessToken
      res = await axiosJWT.get("/v1/blogs/admin", {
        headers: { token: `Bearer ${accessToken}` },
      });
    } else {
      // Sử dụng axios thường nếu không có accessToken
      res = await axios.get("/v1/blogs");
    }
    dispatch(getBlogSuccess(res.data));
  } catch (err) {
    dispatch(getBlogsFailed());
  }
};

export const createBlog = async (blog, accessToken, dispatch, axiosJWT) => {
  dispatch(createBlogStart());
  try {
    const res = await axiosJWT.post("/v1/blogs", blog, {
      headers: {
        "Content-Type": "multipart/form-data",
        token: `Bearer ${accessToken}`,
      },
    });
    console.log("Response from server:", res);
    if (res.status === 201) {
      dispatch(createBlogSuccess(res.data));
      return Promise.resolve(res.data);
    } else {
      dispatch(createBlogFailed());
      const errorMessage = res.data.message || "Failed to create blog.";
      alert(errorMessage);
      return Promise.reject(errorMessage);
    }
  } catch (err) {
    console.error("Error creating blog:", err.response || err);
    dispatch(createBlogFailed());
    const errorMessage = err.response
      ? err.response.data.message || "Failed to create blog."
      : "Network error or server error.";
    alert(errorMessage);
    return Promise.reject(errorMessage);
  }
};

export const deleteBlog = async (postId, accessToken, dispatch, axiosJWT) => {
  try {
    const res = await axiosJWT.delete(`/v1/blogs/${postId}`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    if (res.status === 200) {
      // Xóa blog thành công
      return Promise.resolve();
    } else {
      // Xử lý lỗi từ server
      const errorMessage = res.data.message || "Failed to delete blog.";
      return Promise.reject(errorMessage);
    }
  } catch (err) {
    console.error("Delete blog error:", err);
    const errorMessage = err.response
      ? err.response.data.message || "Failed to delete blog."
      : "Network error or server error.";
    return Promise.reject(errorMessage);
  }
};

export const updateBlog = async (
  postId,
  updatedBlog,
  accessToken,
  dispatch,
  axiosJWT
) => {
  try {
    const res = await axiosJWT.put(`/v1/blogs/${postId}`, updatedBlog, {
      headers: { token: `Bearer ${accessToken}` },
    });
    if (res.status === 200) {
      return Promise.resolve(res.data);
    } else {
      const errorMessage = res.data.message || "Failed to update blog.";
      return Promise.reject(errorMessage);
    }
  } catch (err) {
    console.error("Update blog error:", err);
    const errorMessage = err.response
      ? err.response.data.message || "Failed to update blog."
      : "Network error or server error.";
    return Promise.reject(errorMessage);
  }
};

// Đặt bàn

export const createReservation = async (
  reservationData,
  accessToken,
  dispatch,
  axiosJWT
) => {
  dispatch(createReservationStart());
  try {
    const res = await axiosJWT.post("/v1/reservations", reservationData, {
      headers: { token: `Bearer ${accessToken}` },
    });
    if (res.status === 201) {
      dispatch(createReservationSuccess(res.data));
      return Promise.resolve(res.data);
    } else {
      dispatch(createReservationFailure());
      const errorMessage = res.data.message || "Failed to create reservation.";
      return Promise.reject(errorMessage);
    }
  } catch (err) {
    console.error("Create reservation error:", err);
    dispatch(createReservationFailure());
    const errorMessage = err.response
      ? err.response.data.message || "Failed to create reservation."
      : "Network error or server error.";
    return Promise.reject(errorMessage);
  }
};

export const getAllReservations = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getAllReservationsStart());
  try {
    const res = await axios.get(`/v1/reservations/`); 
    dispatch(getAllReservationsSuccess(res.data));
    return res.data; 
  } catch (err) {
    dispatch(getAllReservationsFailure()); // Thêm dispatch khi có lỗi
    console.error('Failed to fetch reservations:', err);
    const errorMessage = err.response
      ? err.response.data.message || 'Failed to fetch reservations.'
      : 'Network error or server error.';
    return Promise.reject(errorMessage);
  }
};

export const deleteReservation = async (id, accessToken, axiosJWT) => {
  try {
    const res = await axiosJWT.delete(`/v1/reservations/${id}`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    return res.data;
  } catch (err) {
    console.error('Delete reservation error:', err);
    const errorMessage = err.response
      ? err.response.data.message || 'Failed to delete reservation.'
      : 'Network error or server error.';
    return Promise.reject(errorMessage);
  }
};

export const updateReservation = async (id, updatedData, accessToken, axiosJWT) => {
  try {
    const res = await axiosJWT.put(`/v1/reservations/${id}`, updatedData, {
      headers: { token: `Bearer ${accessToken}` },
    });
    return res.data;
  } catch (err) {
    console.error('Update reservation error:', err);
    const errorMessage = err.response
      ? err.response.data.message || 'Failed to update reservation.'
      : 'Network error or server error.';
    return Promise.reject(errorMessage);
  }
};