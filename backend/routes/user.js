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

module.exports = router