const { verify } = require("jsonwebtoken")
const authControllers = require("../controllers/authControllers")
const middlewareController = require("../controllers/middlewareControllers")

const router = require("express").Router()

//LOGIN
//phần logic nằm trong controllers theo mô hình MVC
router.post("/login", authControllers.loginUser)

//REFRESH TOKEN
router.post("/refresh", authControllers.requestRefreshToken)

//LOG OUT
//middlewareController: user phai sign in de lay token roi moi sign out duoc
router.post("/logout", middlewareController.verifyToken ,authControllers.userLogout)

//REGISTER
//phần logic nằm trong controllers theo mô hình MVC
router.post("/register", authControllers.registerUser)

//FORGOT_PASSWORD va REGISTER 
router.get("/verify", authControllers.verify)

// Forgot Password
router.post("/forgot-password", authControllers.forgotPassword);

// Reset Password
router.post("/reset-password", authControllers.resetPassword);

router.post("/resend-verification-email", authControllers.resendVerificationEmail);

module.exports = router