import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    login: {
      currentUser: null,
      isFetching: false,
      error: null, // Lưu lỗi dưới dạng { code, message }
    },
    register: {
      isFetching: false,
      error: null,
      success: false,
    },
  },
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
      state.login.error = null; // Reset lỗi khi bắt đầu login
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
      state.login.error = null;
    },
    loginFailed: (state, action) => {
      state.login.isFetching = false;
      state.login.error = action.payload;
    },
    registerStart: (state) => {
      state.register.isFetching = true;
      state.register.error = null; // Reset lỗi khi bắt đầu register
    },
    registerSuccess: (state) => {
      state.register.isFetching = false;
      state.register.error = null;
      state.register.success = true;
    },
    registerFailed: (state, action) => {
      state.register.isFetching = false;
      state.register.error = action.payload; // Lưu lỗi từ server
      state.register.success = false;
    },
    // Thêm reducer để reset trạng thái register
    resetRegister: (state) => {
      state.register.isFetching = false;
      state.register.error = null;
      state.register.success = false;
    }
  },
});

export const {
  loginStart,
  loginFailed,
  loginSuccess,
  registerStart,
  registerFailed,
  registerSuccess,
  resetRegister
} = authSlice.actions;

export default authSlice.reducer;