const Blog = require('../models/Blogs');

const blogController = {
  // Thêm bài viết mới
  createBlog: async (req, res) => {
    try {
      const { title, content, author } = req.body;

      // Kiểm tra các trường bắt buộc có hợp lệ không
      if (!title || !content || !author) {
        return res.status(400).json({ message: 'Title, content, and author are required' });
      }

      // Tạo một blog mới và lưu vào database
      const newBlog = new Blog({ title, content, author });
      await newBlog.save();

      res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
    } catch (err) {
      res.status(500).json({ error: err.message });
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

      await blog.deleteOne();  // Xóa bài viết khỏi database
      res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Lấy tất cả bài viết
  getBlogs: async (req, res) => {
    try {
      const blogs = await Blog.find();  // Lấy tất cả bài viết từ database
      res.status(200).json(blogs);  // Trả về danh sách bài viết
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Lấy bài viết theo ID
  getBlogById: async (req, res) => {
    try {
      const { id } = req.params;
      const blog = await Blog.findById(id);  // Tìm bài viết theo ID

      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }

      res.status(200).json(blog);  // Trả về bài viết theo ID
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = blogController;
