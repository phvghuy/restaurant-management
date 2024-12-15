<<<<<<< HEAD
=======
//authSlice.js
>>>>>>> develop
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
<<<<<<< HEAD
=======
        },
        register:{
            isFetching: false,
            error: false,
            //them success cho chac
            success: false
>>>>>>> develop
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
<<<<<<< HEAD
=======
        
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
>>>>>>> develop
    }
})

export const {
    loginStart,
    loginFailed,
<<<<<<< HEAD
    loginSuccess
=======
    loginSuccess,
    registerStart,
    registerFailed,
    registerSuccess
>>>>>>> develop
} = authSlice.actions;

export default authSlice.reducer;