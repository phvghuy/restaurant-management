const authControllers = require("../controllers/authControllers")

const router = require("express").Router()


//LOGIN
//phần logic nằm trong controllers theo mô hình MVC
router.post("/login", authControllers.loginUser)

//REFRESH TOKEN
router.post("/refresh", authControllers.requestRefreshToken)



//REGISTER
//phần logic nằm trong controllers theo mô hình MVC
router.post("/register", authControllers.registerUser)


module.exports = router