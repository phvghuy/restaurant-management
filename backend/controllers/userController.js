const User = require("../models/User")

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
}

module.exports = userController