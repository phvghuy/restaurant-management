// backend/routes/menu.js
const menuControllers = require("../controllers/menuControllers")
const middlewareController = require("../controllers/middlewareControllers")

const router = require("express").Router()

//GET DISH DETAIL
router.get("/getDishDetail/:dishName", middlewareController.verifyToken, menuControllers.getDishDetail) 

// GET ALL DISHES
router.get("/getAllDishes", menuControllers.getAllDishes);

module.exports = router