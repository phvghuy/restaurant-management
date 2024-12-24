require('dotenv/config');
const { GridFSBucket, ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Tạo connection string đến MongoDB
const mongoURI = process.env.MONGODB_URL;

// Kết nối tới MongoDB
const conn = mongoose.createConnection(mongoURI);

// Khởi tạo biến gfs toàn cục
let gfs;

// Hàm khởi tạo GridFS
const initGFS = async () => {
  return new Promise((resolve, reject) => {
    conn.once('open', () => {
      // Khởi tạo stream
      gfs = new GridFSBucket(conn.db, {
        bucketName: 'uploads'
      });
      console.log("GridFS initialized with bucket:", 'uploads');
      resolve(gfs);
    });

    conn.on('error', (err) => {
      console.error("MongoDB connection error:", err);
      reject(err);
    });
  });
};

// Cấu hình multer (chỉ cấu hình storage, không cần upload ở đây)
const uploadDir = path.join(__dirname, '../uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

module.exports = { storage, initGFS, mongoose, ObjectId }; // Thay đổi export