const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

// Route cho các chức năng đặt bàn
router.post('/', reservationController.createReservation); // Tạo đặt bàn mới
router.get('/', reservationController.getReservations); // Lấy danh sách đặt bàn
router.get('/:id', reservationController.getReservationById); // Lấy thông tin đặt bàn theo ID
router.post('/check', reservationController.checkReservation); // Kiểm tra đặt bàn

module.exports = router;