//backend/routes/user.js
const {
    getUser,
    updateUser,
    requestEmailUpdate,
    verifyEmailUpdate,
    getAllUsers,
    activateUser,
    deactivateUser,
  } = require("../controllers/userController"); // Import riêng lẻ các hàm cần dùng
  const middlewareController = require("../controllers/middlewareControllers");
  
  const router = require("express").Router();
  
  // GET USER (xem thong tin nguoi dung hien tai dang dang nhap)
  router.get("/getUser", middlewareController.verifyToken, getUser);
  
  // UPDATE USER (chỉnh sửa thông tin người dùng)
  router.put("/updateUser/:id", updateUser);
  
  // Yêu cầu mã xác thực để cập nhật email
  router.post(
    "/requestEmailUpdate",
    middlewareController.verifyToken,
    requestEmailUpdate
  );
  
  // Xác thực và cập nhật email
  router.post(
    "/verifyEmailUpdate",
    middlewareController.verifyToken,
    verifyEmailUpdate
  );
  
  /**
   * @swagger
   * /v1/user:
   *   get:
   *     summary: Get all users
   *     responses:
   *       200:
   *         description: A list of users
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/User'
   */
  // Lấy danh sách người dùng (dành cho admin)
  router.get("/", middlewareController.verifyTokenAndAdminAuth, getAllUsers);
  
  /**
   * @swagger
   * /v1/user/{id}/activate:
   *   patch:
   *     summary: Activate a user account
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: The ID of the user
   *     responses:
   *       200:
   *         description: User account activated
   *       404:
   *         description: User not found
   */
  router.patch("/:id/activate", activateUser);
  
  /**
   * @swagger
   * /v1/user/{id}/deactivate:
   *   patch:
   *     summary: Deactivate a user account
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: The ID of the user
   *     responses:
   *       200:
   *         description: User account deactivated
   *       404:
   *         description: User not found
   */
  router.patch("/:id/deactivate", deactivateUser);
  
  module.exports = router;