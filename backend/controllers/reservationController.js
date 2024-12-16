//backend/controllers/reservationControllers.js
const Reservation = require('../models/Reservation');

// Tạo một đặt bàn mới
const createReservation = async (req, res) => {
  try {
    const { Name, numberOfPeople, reservationDate, phoneNumber, message } = req.body; // Thêm phoneNumber
    const newReservation = new Reservation({
      Name,
      numberOfPeople,
      reservationDate, // Giờ đã được bao gồm trong reservationDate
      phoneNumber,
      message, 
    });
    await newReservation.save();
    res.status(201).json(newReservation);
  } catch (error) {
    res.status(500).json({ message: 'Error creating reservation', error });
  }
};

// Lấy danh sách đặt bàn
const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reservations', error });
  }
};

// Kiểm tra thông tin đặt bàn theo ID
const getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: 'Không tìm thấy thông tin đặt bàn' });
    }
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

const checkReservation = async (req, res) => {
  const { Name, phoneNumber } = req.body; // Lấy số lượng người và tên từ body
  try {
    const reservation = await Reservation.findOne({
      $or: [
        { Name: Name },
        { phoneNumber: phoneNumber }
      ]
    });
    if (!reservation) {
      return res.status(404).json({ message: 'Không có đặt bàn nào phù hợp' });
    }
    res.status(200).json(reservation); // Trả về đặt bàn tìm thấy
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

module.exports = {
  createReservation,
  getReservations,
  getReservationById,
  checkReservation, // Xuất hàm kiểm tra đặt bàn
};