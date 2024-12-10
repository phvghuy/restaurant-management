const menuControllers = require("../controllers/menuControllers")
const middlewareController = require("../controllers/middlewareControllers")

const router = require("express").Router()

//GET DISH DETAIL
router.get("/getDishDetail/:dishName", middlewareController.verifyToken, menuControllers.getDishDetail) 

module.exports = router