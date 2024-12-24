// backend/controllers/blogController.js
const Blog = require('../models/Blogs');

const blogController = {
  // Thêm bài viết mới
  createBlog: async (req, res) => {
    try {
      const newBlog = new Blog({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        imageUrl: 'http://localhost:3000/images/default-blog-image.png',// Thêm imageUrl từ request body
      });

      const savedBlog = await newBlog.save();
      res.status(201).json(savedBlog);
    } catch (err) {
      console.error("Error in createBlog:", err);
      if (err.name === 'ValidationError') {
        return res.status(400).json({ message: "Lỗi validation", errors: err.errors });
      } else if (err.code === 11000) {
        return res.status(400).json({ message: "Lỗi trùng lặp dữ liệu", error: err });
      } else {
        return res.status(500).json({ message: "Lỗi server", error: err.message });
      }
    }
  },

  // Cập nhật bài viết
  updateBlog: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content, author } = req.body;

      // Tìm bài viết theo ID
      const blog = await Blog.findById(id);
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }

      // Cập nhật các trường của bài viết
      blog.title = title || blog.title;
      blog.content = content || blog.content;
      blog.author = author || blog.author;
      blog.updatedAt = Date.now();

      // Lưu lại sự thay đổi trong database
      await blog.save();
      res.status(200).json({ message: 'Blog updated successfully', blog });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Xóa bài viết
  deleteBlog: async (req, res) => {
    try {
      const { id } = req.params;

      // Tìm và xóa bài viết theo ID
      const blog = await Blog.findById(id);
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }

      await blog.deleteOne();
      res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Lấy tất cả bài viết
  getBlogs: async (req, res) => {
    try {
      const blogs = await Blog.find();
      res.status(200).json(blogs);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Lấy bài viết theo ID
  getBlogById: async (req, res) => {
    try {
      const { id } = req.params;
      const blog = await Blog.findById(id);

      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }

      res.status(200).json(blog);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = blogController;