//backend/controllers/userController.js
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const mailer = require("../utils/mailer");

const userController = {
  // GET USER (xem thong tin nguoi dung hien tai dang dang nhap)
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.user.id); // Sử dụng req.user.id từ verifyToken
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
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

  requestEmailUpdate: async (req, res) => {
    try {
      const { newEmail } = req.body;
      const userId = req.user.id; // Lấy userId từ middleware verifyToken

      // Lấy thông tin người dùng hiện tại
      const currentUser = await User.findById(userId);
      if (!currentUser) {
        return res.status(404).json({ message: "User not found" });
      }

      // Kiểm tra nếu newEmail giống với email hiện tại
      if (currentUser.email === newEmail) {
        return res.status(400).json({
          message: "New email is the same as the current email",
        });
      }

      // Kiểm tra nếu newEmail đã tồn tại trong hệ thống
      const existingUser = await User.findOne({ email: newEmail });
      if (existingUser) {
        return res.status(400).json({
          message: "Email already exists in the system",
        });
      }

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

      res.status(200).json({
        message: "Verification email sent. Please check your email.",
      });
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

      res
        .status(200)
        .json({ message: "Email updated successfully", user: updatedUser });
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(400).json("Verification token has expired!");
      }
      res.status(500).json({ error: err.message });
    }
  },

  // Lấy danh sách người dùng (dành cho admin)
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find(); // Lấy tất cả người dùng từ database
      res.status(200).json(users); // Trả về danh sách người dùng
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Kích hoạt tài khoản người dùng
  activateUser: async (req, res) => {
    try {
      const userId = req.params.id; // Lấy ID người dùng từ URL
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.isActive = true; // Cập nhật trạng thái tài khoản thành 'active'
      await user.save(); // Lưu vào database

      res
        .status(200)
        .json({ message: "User account activated successfully", user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Vô hiệu hóa tài khoản người dùng
  deactivateUser: async (req, res) => {
    try {
      const userId = req.params.id; // Lấy ID người dùng từ URL
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.isActive = false; // Cập nhật trạng thái tài khoản thành 'inactive'
      await user.save(); // Lưu vào database

      res
        .status(200)
        .json({ message: "User account deactivated successfully", user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

// Export riêng lẻ từng hàm
module.exports = {
  getUser: userController.getUser,
  updateUser: userController.updateUser,
  requestEmailUpdate: userController.requestEmailUpdate,
  verifyEmailUpdate: userController.verifyEmailUpdate,
  getAllUsers: userController.getAllUsers,
  activateUser: userController.activateUser,
  deactivateUser: userController.deactivateUser,
};