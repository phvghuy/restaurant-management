const userController = require("../controllers/userController")
const middlewareController = require("../controllers/middlewareControllers")

const router = require("express").Router()

//GET USER (xem thong tin nguoi dung)
router.get("/getUser/:id", middlewareController.verifyToken, userController.getUser)

// UPDATE USER (chỉnh sửa thông tin người dùng)
router.put("/updateUser/:id", middlewareController.verifyToken, userController.updateUser);

// Yêu cầu mã xác thực để cập nhật email
router.post("/requestEmailUpdate", middlewareController.verifyToken, userController.requestEmailUpdate);

// Xác thực và cập nhật email
router.post("/verifyEmailUpdate", middlewareController.verifyToken, userController.verifyEmailUpdate);

module.exports = router