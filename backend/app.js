const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const morgan = require("morgan"); // Đảm bảo bạn đã cài đặt morgan
const reservationRoutes = require('./routes/reservationRoutes'); // Import routes

const app = express();
dotenv.config();

// Kết nối đến MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("CONNECTED TO MONGODB");
  } catch (error) {
    console.error("MONGODB CONNECTION ERROR:", error);
    process.exit(1);
  }
};

// Gọi hàm kết nối
connectDB();

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: "50mb" })); // Sử dụng express.json() để phân tích JSON body
app.use(morgan("common")); // Đảm bảo bạn đã cài đặt morgan

// Sử dụng các route
app.use('/api/reservations', reservationRoutes);

// Khởi động server
const PORT = process.env.PORT || 8000; // Sử dụng PORT từ biến môi trường hoặc mặc định là 8000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});