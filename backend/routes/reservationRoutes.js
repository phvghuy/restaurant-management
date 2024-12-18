////backend/routes/reservationRoutes.js
const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const middlewareController = require('../controllers/middlewareControllers');

/**
 * @swagger
 * /api/reservations:
 *   post:
 *     summary: Tạo đặt bàn mới (cho cả user chưa đăng nhập và admin)
 *     tags: [Reservations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Name
 *               - numberOfPeople
 *               - reservationDate
 *               - phoneNumber
 *             properties:
 *               Name:
 *                 type: string
 *                 description: Tên người đặt
 *               numberOfPeople:
 *                 type: integer
 *                 description: Số lượng người
 *               reservationDate:
 *                 type: string
 *                 format: date-time
 *                 description: Ngày giờ đặt bàn (ISO 8601 format)
 *               phoneNumber:
 *                 type: string
 *                 description: Số điện thoại
 *               message:
 *                 type: string
 *                 description: Lời nhắn (tùy chọn)
 *             example:
 *               Name: "John Doe"
 *               numberOfPeople: 4
 *               reservationDate: "2024-12-24T18:00:00.000+07:00"
 *               phoneNumber: "0901234567"
 *               message: "Bàn gần cửa sổ"
 *     responses:
 *       201:
 *         description: Đặt bàn thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Reservation'
 *       400:
 *         description: Bad Request (thiếu thông tin hoặc thông tin không hợp lệ)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Tạo đặt bàn mới
router.post('/', reservationController.createReservation);

/**
 * @swagger
 * /api/reservations:
 *   get:
 *     summary: Lấy danh sách đặt bàn (chỉ admin)
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách đặt bàn
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Reservation'
 *       403:
 *         description: Forbidden (không có quyền admin)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Lấy danh sách đặt bàn (chỉ admin)
router.get('/', middlewareController.verifyToken, reservationController.isAdmin, reservationController.getReservations);

/**
 * @swagger
 * /api/reservations/{id}:
 *   get:
 *     summary: Lấy thông tin đặt bàn theo ID (chỉ admin)
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của đặt bàn
 *     responses:
 *       200:
 *         description: Thông tin đặt bàn
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       403:
 *         description: Forbidden (không có quyền admin)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Không tìm thấy đặt bàn
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Reservation not found"
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Lấy thông tin đặt bàn theo ID (chỉ admin)
router.get('/:id', middlewareController.verifyToken, reservationController.isAdmin, reservationController.getReservationById);

/**
 * @swagger
 * /api/reservations/check:
 *   post:
 *     summary: Kiểm tra đặt bàn cho user (theo tên hoặc số điện thoại)
 *     tags: [Reservations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Name
 *               - phoneNumber
 *             properties:
 *               Name:
 *                 type: string
 *                 description: Tên người đặt (bắt buộc nếu không có phoneNumber)
 *               phoneNumber:
 *                 type: string
 *                 description: Số điện thoại (bắt buộc nếu không có Name)
 *             example:
 *               Name: "John Doe"
 *               phoneNumber: null
 *     responses:
 *       200:
 *         description: Thông tin đặt bàn tìm được
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       400:
 *         description: Bad Request (thiếu thông tin `Name` hoặc `phoneNumber`)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Không tìm thấy đặt bàn
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Reservation not found"
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Kiểm tra đặt bàn cho user (theo tên hoặc số điện thoại)
router.post('/check', reservationController.checkReservationByUser);

/**
 * @swagger
 * /api/reservations/check/admin:
 *   get:
 *     summary: Kiểm tra đặt bàn cho admin (theo ID, tên, số điện thoại, hoặc lấy tất cả)
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         description: ID của đặt bàn (nếu có)
 *       - in: query
 *         name: Name
 *         schema:
 *           type: string
 *         description: Tên người đặt (nếu có)
 *       - in: query
 *         name: phoneNumber
 *         schema:
 *           type: string
 *         description: Số điện thoại (nếu có)
 *     responses:
 *       200:
 *         description: Thông tin đặt bàn tìm được hoặc danh sách tất cả đặt bàn
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/Reservation'
 *                 - type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: true
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Reservation'
 *       403:
 *         description: Forbidden (không có quyền admin)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Không tìm thấy đặt bàn (chỉ khi tìm theo ID, Name, hoặc phoneNumber)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Reservation not found"
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Kiểm tra đặt bàn cho admin (theo ID, tên, số điện thoại, hoặc lấy tất cả)
router.get('/check/admin', middlewareController.verifyToken, reservationController.isAdmin, reservationController.checkReservationByAdmin);

module.exports = router;