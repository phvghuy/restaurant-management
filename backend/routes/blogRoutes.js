const express = require('express');
const router = express.Router();
const Blog = require('../models/Blogs');

/**
 * @swagger
 * /v1/blogs:
 *   post:
 *     summary: Thêm một bài viết mới
 *     tags: [Blog]
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
 *         description: Bài viết đã được tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.post('/', async (req, res) => {
    try {
        const { title, content, author } = req.body;
        const blog = new Blog({ title, content, author });
        await blog.save();
        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /v1/blogs/{id}:
 *   put:
 *     summary: Cập nhật bài viết
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của bài viết
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
 *         description: Bài viết đã được cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       404:
 *         description: Bài viết không tồn tại
 *       400:
 *         description: Lỗi dữ liệu
 */
router.put('/:id', async (req, res) => {
    try {
        const { title, content, author } = req.body;
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: 'Không tìm thấy bài viết' });
        }

        if (title) blog.title = title;
        if (content) blog.content = content;
        if (author) blog.author = author;
        blog.updated_at = Date.now();

        await blog.save();
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /v1/blogs/{id}:
 *   delete:
 *     summary: Xóa bài viết
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của bài viết
 *     responses:
 *       200:
 *         description: Bài viết đã được xóa thành công
 *       404:
 *         description: Bài viết không tồn tại
 */
router.delete('/:id', async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Không tìm thấy bài viết' });
        }
        res.json({ message: 'Đã xóa bài viết', blog });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
