import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice ({
    name: "auth",
    initialState:{
        login:{
            // Tất cả thông tin User được trả về (respone) sẽ được lưu vào currentUseer
            currentUser: null,
            // Chức năng login
            isFetching: false,
            error: false
        }
    },
    reducers:{
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
        },
        loginFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },
    }
})

export const {
    loginStart,
    loginFailed,
    loginSuccess
} = authSlice.actions;

export default authSlice.reducer;