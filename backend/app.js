const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const authRoute = require("./routes/auth")
const blogRoutes = require("./routes/blogRoutes"); // Import route blog
const swaggerSetup = require('./config/swagger'); // Import cấu hình Swagger

dotenv.config()
const app = express()

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

// app.use(cors()) giúp ứng dụng của bạn tránh lỗi 
//CORS khi front-end và back-end nằm trên các miền khác nhau, 
//giúp giao tiếp giữa hai bên dễ dàng hơn.
app.use(cors())
app.use(cookieParser())
app.use(express.json())

// Tích hợp Swagger
swaggerSetup(app);

//ROUTES
app.use("/v1/auth", authRoute);
app.use("/v1/blogs", blogRoutes); // Đăng ký route blog

app.listen(3000, () => {
    console.log("Server is running");
    console.log("Swagger Docs available at http://localhost:3000/api-docs");
})

