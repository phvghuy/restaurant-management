// frontend/pages/redux/reservationSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk action để tạo đặt bàn
export const createReservation = createAsyncThunk(
  'reservations/create',
  async (reservationData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/reservations', reservationData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk action để lấy danh sách đặt bàn
export const fetchReservations = createAsyncThunk(
  'reservations/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/reservations');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk action để lấy thông tin đặt bàn theo ID
export const fetchReservationById = createAsyncThunk(
  'reservations/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/reservations/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk action để kiểm tra đặt bàn
export const checkReservation = createAsyncThunk(
  'reservations/check',
  async (checkData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/reservations/check', checkData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const reservationSlice = createSlice({
  name: 'reservations',
  initialState: {
    reservations: [],
    currentReservation: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Xử lý createReservation
      .addCase(createReservation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createReservation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reservations.push(action.payload);
      })
      .addCase(createReservation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Xử lý fetchReservations
      .addCase(fetchReservations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReservations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reservations = action.payload;
      })
      .addCase(fetchReservations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Xử lý fetchReservationById
      .addCase(fetchReservationById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReservationById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentReservation = action.payload;
      })
      .addCase(fetchReservationById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Xử lý checkReservation
      .addCase(checkReservation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkReservation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentReservation = action.payload;
      })
      .addCase(checkReservation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default reservationSlice.reducer;