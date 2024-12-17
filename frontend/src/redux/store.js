//frontend/src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import reservationReducer from "./reservationSlice"; 

export default configureStore({
    reducer:{
        auth: authReducer,
        reservations: reservationReducer,
    }
});
