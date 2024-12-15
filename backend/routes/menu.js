const menuControllers = require("../controllers/menuControllers")
const middlewareController = require("../controllers/middlewareControllers")

const router = require("express").Router()

//GET DISH DETAIL
router.get("/getDishDetail/:dishName", middlewareController.verifyToken, menuControllers.getDishDetail) 

/**
 * @swagger
 * /v1/menu/all:
 *   get:
 *     summary: Lấy danh sách tất cả món ăn
 *     tags: [Menu]
 *     responses:
 *       200:
 *         description: Danh sách món ăn
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Dish'
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */
router.get("/all", menuControllers.getMenu);

/**
 * @swagger
 * /v1/menu:
 *   get:
 *     summary: Lấy danh sách món ăn theo danh mục
 *     tags: [Menu]
 *     parameters:
 *       - in: query
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *           enum: ["sushi", "sashimi", "grilled_dishes", "hot_pots", "desserts", "beverages"]
 *         description: Danh mục món ăn
 *     responses:
 *       200:
 *         description: Danh sách món ăn theo danh mục
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Dish'
 *       400:
 *         description: Danh mục không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid category"
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */
router.get("/", menuControllers.getDishesByCategory);

/**
 * @swagger
 * /v1/menu/categories:
 *   get:
 *     summary: Lấy danh sách danh mục món ăn
 *     tags: [Menu]
 *     responses:
 *       200:
 *         description: Danh sách danh mục món ăn
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "sushi"
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */
router.get("/categories", menuControllers.getCategories);


module.exports = router