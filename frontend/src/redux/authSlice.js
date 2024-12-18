//authSlice.js
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
        },
        register:{
            isFetching: false,
            error: false,
            //them success cho chac
            success: false
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
        
        //REGISTER
        registerStart: (state) => {
            state.register.isFetching = true;
        },
        registerSuccess: (state) => {
            state.register.isFetching = false;
            state.register.error = false;
            state.register.success = true;
        },
        registerFailed: (state) => {
            state.register.isFetching = false;
            state.register.error = true;
            state.register.success = false;
        },
    }
})

export const {
    loginStart,
    loginFailed,
    loginSuccess,
    registerStart,
    registerFailed,
    registerSuccess
} = authSlice.actions;

export default authSlice.reducer;