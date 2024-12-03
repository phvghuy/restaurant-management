const authControllers = require("../controllers/authControllers")
const middlewareController = require("../controllers/middlewareControllers")

const router = require("express").Router()

//LOGIN
//phần logic nằm trong controllers theo mô hình MVC
router.post("/login", authControllers.loginUser)

//REFRESH TOKEN
router.post("/refresh", authControllers.requestRefreshToken)

module.exports = router