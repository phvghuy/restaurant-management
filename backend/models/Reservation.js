//backend/models/Reservation.js
const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  numberOfPeople: {
    type: Number,
    required: true,
  },
  reservationDate: {
    type: Date, // Trường này sẽ lưu cả ngày và giờ
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: false, 
  },
  status: {
    type: String,
    enum: ['Chờ xử lý', 'Hoàn thành', 'Đã hủy'], // Các trạng thái cho phép
    default: 'Chờ xử lý', // Trạng thái mặc định
  },
  note: {
    type: String,
    required: false,
  }
}, { timestamps: true } //thêm thời gian khi tạo và cập nhật
);

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;