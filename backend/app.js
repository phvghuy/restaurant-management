// backend/app.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const reservationRoutes = require('./routes/reservationRoutes');
const authRoute = require("./routes/auth")
const blogRoutes = require("./routes/blogRoutes");
const swaggerSetup = require('./config/swagger');
const userRoute = require("./routes/user")
const menuRoute = require("./routes/menu")
const path = require('path');

const app = express();
dotenv.config();

// Sử dụng async function để kết nối với MongoDB
async function connectDB() {
    try {
      await mongoose.connect(process.env.MONGODB_URL);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
}
connectDB();

// Middleware
app.use(cors());
app.use(cookieParser())
app.use(express.json());
app.use(morgan("common")); 
app.use(express.static('public'));
// Serve static files from the 'public' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Tích hợp Swagger
swaggerSetup(app);

//ROUTES
app.use("/v1/auth", authRoute);
app.use("/v1/blogs", blogRoutes); 
app.use("/v1/user", userRoute)
app.use('/api/reservations', reservationRoutes)
app.use("/v1/menu", menuRoute)

app.listen(8000, () => {
    console.log("Server is running");
    console.log("Swagger Docs available at http://localhost:8000/api-docs");
})