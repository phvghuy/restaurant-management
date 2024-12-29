//backend/routes/reservationRoutes.js
const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const middlewareController = require('../controllers/middlewareControllers');

// Route cho các chức năng đặt bàn
router.post('/', middlewareController.verifyTokenAndAdminAuth, reservationController.createReservation); // Tạo đặt bàn mới
router.get('/', reservationController.getAllReservations); // Lấy danh sách đặt bàn
router.get('/:id', middlewareController.verifyTokenAndAdminAuth, reservationController.getReservationById); // Lấy thông tin đặt bàn theo ID
router.post('/check', reservationController.checkReservation); // Kiểm tra đặt bàn
router.put('/:id', middlewareController.verifyTokenAndAdminAuth, reservationController.updateReservation); // Cập nhật đặt bàn
router.delete('/:id', middlewareController.verifyTokenAndAdminAuth, reservationController.deleteReservation); // Xóa đặt bàn

module.exports = router;