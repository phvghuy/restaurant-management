//backend/controllers/reservationController.js
const Reservation = require('../models/Reservation');

// Tạo một đặt bàn mới
const createReservation = async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    const { Name, numberOfPeople, reservationDate, phoneNumber, message } = req.body;
    const newReservation = new Reservation({
      Name,
      numberOfPeople,
      reservationDate,
      phoneNumber,
      message,
    });
    await newReservation.save();
    res.status(201).json(newReservation);
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ message: 'Error creating reservation', error: error.message });
  }
};

// Lấy danh sách đặt bàn
const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ reservationDate: -1 }); // Sắp xếp giảm dần theo ngày đặt
    console.log("Reservations fetched from DB:", reservations); // Thêm dòng này để kiểm tra
    res.status(200).json(reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error); // Thêm dòng này để ghi log lỗi
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
  const { Name, phoneNumber } = req.body;
  try {
    const reservation = await Reservation.findOne({
      $or: [{ Name: Name }, { phoneNumber: phoneNumber }],
    });
    if (!reservation) {
      return res.status(404).json({ message: 'Không có đặt bàn nào phù hợp' });
    }
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

// Cập nhật thông tin đặt bàn
const updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const { Name, numberOfPeople, reservationDate, phoneNumber, message, status, note } = req.body;

    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ message: 'Không tìm thấy đặt bàn' });
    }

    reservation.Name = Name;
    reservation.numberOfPeople = numberOfPeople;
    reservation.reservationDate = reservationDate;
    reservation.phoneNumber = phoneNumber;
    reservation.message = message;
    reservation.status = status; 
    reservation.note = note;

    await reservation.save();
    res.status(200).json(reservation);
  } catch (error) {
    console.error('Error updating reservation:', error);
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

// Xóa đặt bàn
const deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findByIdAndDelete(id);
    if (!reservation) {
      return res.status(404).json({ message: 'Không tìm thấy đặt bàn' });
    }
    res.status(200).json({ message: 'Đặt bàn đã được xóa thành công' });
  } catch (error) {
    console.error('Error deleting reservation:', error);
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

module.exports = {
  createReservation,
  getAllReservations,
  getReservationById,
  checkReservation,
  updateReservation,
  deleteReservation,
};