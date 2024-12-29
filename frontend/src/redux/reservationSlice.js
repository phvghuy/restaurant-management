// frontend/src/redux/reservationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const reservationSlice = createSlice({
  name: "reservations",
  initialState: {
    reservations: [],
    isFetching: false,
    error: false,
    createReservation: {
      isFetching: false,
      error: false,
      success: false,
    },
    createUserReservation: { // Thêm state cho user
      isFetching: false,
      error: false,
      success: false,
    },
  },
  reducers: {
    getAllReservationsStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getAllReservationsSuccess: (state, action) => {
      state.isFetching = false;
      state.reservations = action.payload;
    },
    getAllReservationsFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    createReservationStart: (state) => {
      // Kiểm tra và khởi tạo state.createReservation nếu nó chưa tồn tại
      state.createReservation = state.createReservation ?? {
        isFetching: false,
        error: false,
        success: false,
      };
      // Bây giờ có thể an toàn gán giá trị
      state.createReservation.isFetching = true;
      state.createReservation.error = false;
      state.createReservation.success = false;
    },
    createReservationSuccess: (state, action) => {
      state.createReservation.isFetching = false;
      state.createReservation.success = true;
      state.reservations.push(action.payload);
    },
    createReservationFailure: (state) => {
      state.createReservation.isFetching = false;
      state.createReservation.error = true;
      state.createReservation.success = false;
    },
    // Thêm reducers cho user
    createUserReservationStart: (state) => {
      state.createUserReservation.isFetching = true;
      state.createUserReservation.error = false;
      state.createUserReservation.success = false;
    },
    createUserReservationSuccess: (state, action) => {
      state.createUserReservation.isFetching = false;
      state.createUserReservation.success = true;
      state.reservations.push(action.payload); // Có thể bạn không cần lưu vào state.reservations
    },
    createUserReservationFailure: (state) => {
      state.createUserReservation.isFetching = false;
      state.createUserReservation.error = true;
      state.createUserReservation.success = false;
    },
    deleteReservationStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteReservationSuccess: (state, action) => {
      state.isFetching = false;
      state.reservations = state.reservations.filter(
        (reservation) => reservation._id !== action.payload
      );
    },
    deleteReservationFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    updateReservationStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateReservationSuccess: (state, action) => {
      state.isFetching = false;
      const index = state.reservations.findIndex(
        (reservation) => reservation._id === action.payload._id
      );
      if (index !== -1) {
        state.reservations[index] = action.payload;
      }
    },
    updateReservationFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    resetCreateReservationState: (state) => {
      state.createReservation.isFetching = false;
      state.createReservation.error = false;
      state.createReservation.success = false;
    },
    // Thêm reducer để reset trạng thái createUserReservation
    resetCreateUserReservationState: (state) => {
      // Kiểm tra và khởi tạo state.createUserReservation nếu nó chưa tồn tại
      state.createUserReservation = state.createUserReservation ?? {
        isFetching: false,
        error: false,
        success: false,
      };

      // Bây giờ có thể an toàn gán giá trị
      state.createUserReservation.isFetching = false;
      state.createUserReservation.error = false;
      state.createUserReservation.success = false;
    },
  },
});

export const {
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
  resetCreateReservationState,
  createUserReservationStart, 
  createUserReservationSuccess, 
  createUserReservationFailure,
  resetCreateUserReservationState, 
} = reservationSlice.actions;

export default reservationSlice.reducer;