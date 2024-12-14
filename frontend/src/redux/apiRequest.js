import axios from "axios";
import { loginFailed, loginStart, loginSuccess } from "./authSlice";

// user: Thông tin người dùng cần để đăng nhập (ví dụ: username, password).
// dispatch: Hàm dispatch của Redux, được sử dụng để gửi các actions đến store.
// navigate: Hàm navigate từ react-router-dom (hoặc thư viện tương tự), được sử dụng để chuyển hướng trang.
export const loginUser = async (user, dispatch, navigate) => { 
    dispatch(loginStart()); 
    try {
        console.log("User data:", user); // Log user data
        //Vì đã cấu hình trong package.json là "proxy": "http://localhost:8000/"
        // Nên có thể viết tắt dòng ("http://localhost:8000/v1/auth/login", user);
        const res = await axios.post("/v1/auth/login", user);
        
        console.log("API response:", res); // Log API response
        dispatch(loginSuccess(res.data));
        navigate("/");
      } catch (err) {
        console.error("Login error:", err); // Log error
        dispatch(loginFailed());
      }
  };