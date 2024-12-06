const userController = require("../controllers/userController")
const middlewareController = require("../controllers/middlewareControllers")

const router = require("express").Router()

//GET USER (xem thong tin nguoi dung)
router.get("/getUser/:id", middlewareController.verifyToken, userController.getUser)

// UPDATE USER (chỉnh sửa thông tin người dùng)
router.put("/updateUser/:id", middlewareController.verifyToken, userController.updateUser);

module.exports = router