// backend/controllers/blogController.js
const Blog = require('../models/Blogs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Cấu hình Multer để lưu trữ file trong thư mục 'public/images'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Giới hạn kích thước file 5MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('imageUrl'); // 'imageUrl' là tên của trường file trong form

// Kiểm tra loại file
function checkFileType(file, cb) {
  // Các loại file ảnh cho phép
  const filetypes = /jpeg|jpg|png|gif/;
  // Kiểm tra ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Kiểm tra mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

const blogController = {
  // Thêm bài viết mới
  createBlog: async (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        // Xử lý lỗi Multer
        if (err instanceof multer.MulterError) {
          return res.status(400).json({ message: "Multer error", error: err.message });
        } else {
          return res.status(400).json({ message: "Upload error", error: err });
        }
      } else {
        // Kiểm tra xem có file được upload không
        if (req.file === undefined) {
          return res.status(400).json({ message: 'No file selected!' });
        }

        try {
          const newBlog = new Blog({
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
            imageUrl: `http://localhost:8000/uploads/${req.file.filename}`,
          });

          const savedBlog = await newBlog.save();
          res.status(201).json(savedBlog);
        } catch (err) {
          console.error("Error in createBlog:", err);
          if (err.name === 'ValidationError') {
            return res.status(400).json({ message: "Validation error", errors: err.errors });
          } else if (err.code === 11000) {
            return res.status(400).json({ message: "Duplicate data error", error: err });
          } else {
            return res.status(500).json({ message: "Server error", error: err.message });
          }
        }
      }
    });
  },

  // Cập nhật bài viết
  updateBlog: async (req, res) => {
    upload(req, res, async (err) => {
    if (err) {
        if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: "Multer error", error: err.message });
        } else {
        return res.status(400).json({ message: "Upload error", error: err });
        }
    } else {
        try {
        const { id } = req.params;
        const { title, content, author } = req.body;

        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        blog.title = title || blog.title;
        blog.content = content || blog.content;
        blog.author = author || blog.author;
        blog.updatedAt = Date.now();

        // Kiểm tra xem có file mới được upload không
        if (req.file) {
            // Xóa ảnh cũ nếu có
            if (blog.imageUrl) {
              const oldImagePath = path.join(__dirname, '../uploads', path.basename(blog.imageUrl));
              if (fs.existsSync(oldImagePath)) {
                  fs.unlinkSync(oldImagePath);
              }
          }
          blog.imageUrl = `http://localhost:8000/uploads/${req.file.filename}`; 
        }

        await blog.save();
        res.status(200).json({ message: 'Blog updated successfully', blog });
        } catch (err) {
        console.error("Error in updateBlog:", err);
        res.status(500).json({ error: err.message });
        }
    }
    });
},

  // Xóa bài viết
  deleteBlog: async (req, res) => {
    try {
    const { id } = req.params;

    const blog = await Blog.findById(id);
    if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
    }

    // Xóa file ảnh liên quan đến blog (nếu có)
    if (blog.imageUrl) {
      const imagePath = path.join(__dirname, '../uploads', path.basename(blog.imageUrl));
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
  }

    await blog.deleteOne();
    res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (err) {
    console.error("Error in deleteBlog:", err);
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