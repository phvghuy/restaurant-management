const userController = require("../controllers/userController")
const middlewareController = require("../controllers/middlewareControllers")

const router = require("express").Router()

//GET USER (xem thong tin nguoi dung)
router.get("/getUser/:id", middlewareController.verifyToken, userController.getUser)

// UPDATE USER (chỉnh sửa thông tin người dùng)
router.put("/updateUser/:id", userController.updateUser);

// Yêu cầu mã xác thực để cập nhật email
router.post("/requestEmailUpdate", middlewareController.verifyToken, userController.requestEmailUpdate);

// Xác thực và cập nhật email
router.post("/verifyEmailUpdate", middlewareController.verifyToken, userController.verifyEmailUpdate);

// Đổi mật khẩu
router.put("/changePassword", middlewareController.verifyToken, userController.changePassword);

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
// Lấy danh sách người dùng
router.get("/", userController.getUsers);

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
router.patch("/:id/activate", userController.activateUser);

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
router.patch("/:id/deactivate", userController.deactivateUser);

/**
 * @swagger
 * /v1/user/changePassword:
 *   put:
 *     summary: Đổi mật khẩu người dùng
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *               - confirmNewPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 description: Mật khẩu hiện tại
 *               newPassword:
 *                 type: string
 *                 description: Mật khẩu mới
 *               confirmNewPassword:
 *                 type: string
 *                 description: Xác nhận mật khẩu mới
 *             example:
 *               currentPassword: "old_password"
 *               newPassword: "new_password"
 *               confirmNewPassword: "new_password"
 *     responses:
 *       200:
 *         description: Đổi mật khẩu thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Password changed successfully"
 *       400:
 *         description: Lỗi request (sai mật khẩu cũ, mật khẩu mới trùng mật khẩu cũ, mật khẩu mới quá ngắn, mật khẩu mới và xác nhận mật khẩu mới không khớp, thiếu tham số)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden (token không hợp lệ)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Không tìm thấy user
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
router.put("/changePassword", middlewareController.verifyToken, userController.changePassword);
module.exports = router