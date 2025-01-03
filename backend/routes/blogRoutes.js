// backend/routes/blogRoutes.js
const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const middlewareController = require('../controllers/middlewareControllers');

/**
 * @swagger
 * /v1/blogs:
 *   post:
 *     summary: Create a new blog
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       201:
 *         description: Blog created successfully
 *       400:
 *         description: Bad request
 */
// Route tạo blog ADMIN
router.post("/", middlewareController.verifyTokenAndAdminAuth, blogController.createBlog);

/**
 * @swagger
 * /v1/blogs/{id}:
 *   put:
 *     summary: Update a blog
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the blog
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *       404:
 *         description: Blog not found
 */
router.put("/:id", blogController.updateBlog);

/**
 * @swagger
 * /v1/blogs/{id}:
 *   delete:
 *     summary: Delete a blog
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the blog
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 *       404:
 *         description: Blog not found
 */
router.delete("/:id", blogController.deleteBlog);

/**
 * @swagger
 * /v1/blogs:
 *   get:
 *     summary: Get all blogs
 *     responses:
 *       200:
 *         description: A list of blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 */
// Route cho public (không cần xác thực)
router.get("/", blogController.getBlogs);

// Route cho admin (yêu cầu xác thực)
router.get("/admin", middlewareController.verifyToken, blogController.getBlogs);

/**
 * @swagger
 * /v1/blogs/{id}:
 *   get:
 *     summary: Get a blog by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the blog
 *     responses:
 *       200:
 *         description: A blog object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       404:
 *         description: Blog not found
 */
router.get("/:id", blogController.getBlogById);

module.exports = router;