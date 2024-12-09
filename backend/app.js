
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const morgan = require("morgan"); // Đảm bảo bạn đã cài đặt morgan
const reservationRoutes = require('./routes/reservationRoutes'); // Import routes
const authRoute = require("./routes/auth")
const userRoute = require("./routes/user")

const app = express();
dotenv.config();

connectDB();

// Sử dụng async function để kết nối với MongoDB
async function connectDB() {
  try {
      await mongoose.connect(process.env.MONGODB_URL);
      console.log("Connected to MongoDB");
  } catch (error) {
      console.error("Error connecting to MongoDB:", error);
  }
}

// Middleware
// app.use(cors()) giúp ứng dụng của bạn tránh lỗi 
//CORS khi front-end và back-end nằm trên các miền khác nhau, 
//giúp giao tiếp giữa hai bên dễ dàng hơn.
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(morgan("common")); // Đảm bảo bạn đã cài đặt morgan

//ROUTES
app.use("/v1/auth", authRoute)
app.use("/v1/user", userRoute)
app.use('/api/reservations', reservationRoutes);

app.listen(8000, () => {
    console.log("Server is running")
})

