const menuControllers = require("../controllers/menuControllers")
const middlewareController = require("../controllers/middlewareControllers")

const router = require("express").Router()

//GET DISH DETAIL
router.get("/getDishDetail/:dishName", middlewareController.verifyToken, menuControllers.getDishDetail) 

/**
 * @swagger
 * /v1/menu/search:
 *   get:
 *     summary: Tìm kiếm món ăn
 *     tags: [Menu]
 *     parameters:
 *       - in: query
 *         name: dish_name
 *         schema:
 *           type: string
 *         description: Tên món ăn cần tìm (không bắt buộc)
 *         examples:
 *           example1:
 *             summary: Tìm theo tên món ăn
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: ["sushi", "sashimi", "grilled_dishes", "hot_pots", "desserts", "beverages"]
 *         description: Loại món ăn (không bắt buộc)
 *         examples:
 *           example2:
 *             summary: Tìm theo loại món ăn
 *             value: Hải sản
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Số trang
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         description: Số lượng món ăn mỗi trang
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [price_asc, price_desc, name_asc, name_desc]
 *         description: Sắp xếp kết quả tìm kiếm
 *     responses:
 *       200:
 *         description: Danh sách món ăn tìm được
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
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *                     totalPages:
 *                       type: integer
 *                       example: 1
 *                     totalItems:
 *                       type: integer
 *                       example: 2
 *       400:
 *         description: Tham số không hợp lệ
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
 *                   example: "Invalid parameters"
 *       404:
 *         description: Không tìm thấy món ăn
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
 *                   example: "No dishes found matching the criteria"
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
// SEARCH DISH
router.get("/search", menuControllers.searchDish);

module.exports = router