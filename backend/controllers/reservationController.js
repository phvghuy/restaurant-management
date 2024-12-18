//backend/controllers/reservationControllers.js
const Reservation = require('../models/Reservation');

// Middleware kiểm tra quyền admin
const isAdmin = (req, res, next) => {
    if (req.user && req.user.admin) {
        next();
    } else {
        res.status(403).json({ success: false, message: "Permission denied. Admin access required." });
    }
};

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

  // Lấy danh sách đặt bàn (chỉ admin)
const getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.status(200).json({ success: true, data: reservations });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error fetching reservations', error });
    }
};

// Kiểm tra thông tin đặt bàn theo ID (chỉ admin)
const getReservationById = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) {
            return res.status(404).json({ success: false, message: 'Reservation not found' });
        }
        res.status(200).json({ success: true, data: reservation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error', error });
    }
};

// Kiểm tra đặt bàn cho user (theo tên hoặc số điện thoại)
const checkReservationByUser = async (req, res) => {
    const { Name, phoneNumber } = req.body;

    // Bắt buộc phải có ít nhất Name hoặc phoneNumber
    if (!Name && !phoneNumber) {
        return res.status(400).json({ success: false, message: 'Name or phoneNumber is required' });
    }

    try {
        const reservation = await Reservation.findOne({
            $or: [
                { Name: { $regex: new RegExp(Name, "i") } },
                { phoneNumber: phoneNumber }
            ]
        });

        if (!reservation) {
            return res.status(404).json({ success: false, message: 'Reservation not found' });
        }

        res.status(200).json({ success: true, data: reservation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Kiểm tra đặt bàn cho admin (theo ID, tên, số điện thoại, hoặc lấy tất cả)
const checkReservationByAdmin = async (req, res) => {
    try {
        // Kiểm tra xem có query parameter 'id' hay không
        if (req.query.id) {
            const reservation = await Reservation.findById(req.query.id);
            if (!reservation) {
                return res.status(404).json({ success: false, message: 'Reservation not found' });
            }
            return res.status(200).json({ success: true, data: reservation });
        }

        // Kiểm tra xem có query parameter 'Name' hoặc 'phoneNumber' hay không
        const { Name, phoneNumber } = req.query;
        if (Name || phoneNumber) {
            const reservation = await Reservation.findOne({
                $or: [
                    { Name: { $regex: new RegExp(Name, "i") } },
                    { phoneNumber: phoneNumber }
                ]
            });
            if (!reservation) {
                return res.status(404).json({ success: false, message: 'Reservation not found' });
            }
            return res.status(200).json({ success: true, data: reservation });
        }

        // Nếu không có query parameter 'id', 'Name', hoặc 'phoneNumber', trả về tất cả đặt bàn
        const reservations = await Reservation.find();
        res.status(200).json({ success: true, data: reservations });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = {
    createReservation,
    getReservations,
    getReservationById,
    checkReservationByUser,
    checkReservationByAdmin,
    isAdmin
};