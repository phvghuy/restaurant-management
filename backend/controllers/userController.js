const User = require("../models/User")
const jwt = require("jsonwebtoken");  // Đảm bảo bạn đã khai báo import jwt
const mailer = require("../utils/mailer"); // Import mailer đã cấu hình

const userController = {
    //GET USER (xem thong tin nguoi dung)
    getUser: async(req, res) => {
        try {
            // params.id: v1/user/idUser
            const user = await User.findById(req.params.id)
            res.status(200).json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    // UPDATE USER (chỉnh sửa thông tin người dùng)
    updateUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const allowedUpdates = ["fullName", "phoneNumber"];
            const updates = Object.keys(req.body);

            // Log để kiểm tra keys trong req.body
            console.log("Updates:", updates); 
            // Log nội dung req.body
            console.log("Request Body:", req.body); 
    
            // Kiểm tra các trường hợp cập nhật có hợp lệ không
            const isValidOperation = updates.every((update) =>
                allowedUpdates.includes(update)
            );
    
            if (!isValidOperation) {
                // Trả về lỗi và dừng thực thi
                return res.status(400).json({ message: "Invalid updates!" });
            }
    
            // Thực hiện cập nhật
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                req.body,
                {
                    new: true, // Trả về dữ liệu đã cập nhật
                    runValidators: true, // Kiểm tra validation trong schema
                }
            );
    
            if (!updatedUser) {
                // Nếu không tìm thấy user, trả về lỗi và dừng thực thi
                return res.status(404).json({ message: "User not found" });
            }
    
            // Nếu mọi thứ thành công, trả về dữ liệu đã cập nhật
            return res.status(200).json(updatedUser);
        } catch (err) {
            // Xử lý lỗi và đảm bảo chỉ gửi một lần phản hồi
            return res.status(500).json(err);
        }
    },    

     // API gửi mã xác thực qua email
     requestEmailUpdate: async (req, res) => {
        try {
            const { newEmail } = req.body;
            const userId = req.user.id; // Lấy userId từ middleware verifyToken

            // Tạo mã xác thực bằng JWT
            const token = jwt.sign(
                { userId, newEmail },
                process.env.JWT_ACCESS_KEY,
                { expiresIn: "10m" }
            );

            // Gửi email chứa mã xác thực
            await mailer.sendMail({
                to: newEmail,
                subject: "[RESTAURANT MANAGEMENT] Verify Email Update",
                htmlContent: `<p>Click the link below to verify your email update:</p>
                    <a href="${process.env.APP_URL}/v1/user/verify-email-update?token=${token}">Verify Email Update</a>`,
            });

            res.status(200).json({ message: "Verification email sent. Please check your email." });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // API xác thực và cập nhật email
    verifyEmailUpdate: async (req, res) => {
        try {
            const { token } = req.body; // Lấy token từ body

            // Giải mã token
            const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);
            const { userId, newEmail } = decoded;

            // Kiểm tra userId từ middleware và token có khớp không
            if (req.user.id !== userId) {
                return res.status(403).json("Unauthorized operation");
            }

            // Cập nhật email trong cơ sở dữ liệu
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { email: newEmail },
                { new: true }
            );

            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }

            res.status(200).json({ message: "Email updated successfully", user: updatedUser });
        } catch (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(400).json("Verification token has expired!");
            }
            res.status(500).json({ error: err.message });
        }
    },
}

module.exports = userController