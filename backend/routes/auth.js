const authControllers = require("../controllers/authControllers")

const router = require("express").Router()

//REGISTER
//phần logic nằm trong controllers theo mô hình MVC
router.post("/register", authControllers.registerUser)

module.exports = router