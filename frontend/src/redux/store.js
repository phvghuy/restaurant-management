//frontend/src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import reservationReducer from "./reservationSlice"; 
import blogReducer from "./blogSlice";

export default configureStore({
    reducer:{
        auth: authReducer,
        reservations: reservationReducer,
        blogs: blogReducer,
    },
});
