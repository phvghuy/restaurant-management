const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        //bắt buộc nhập username
        required: true,
        minlength: 3,
        maxlength: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    fullName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
    },
    phoneNumber: {
        type: String,
        required: true,
        minlength: 10,
        // Kiểm tra định dạng số điện thoại
        match: [/^\+?[0-9]{10,}$/, 'Please enter a valid phone number. It should start with a "+" and be followed by numbers.'] 
    },
    admin: {
        type: Boolean,
        //mặc định ko phải là admin
        default: false,
    },
    emailVerifiedAt: {
        type: Date, // Lưu thời gian xác minh email
        default: null,
    },
    //thêm thời gian khi tạo và cập nhật
}, { timestamps: true }
);

// Static method to verify email
userSchema.statics.verify = async function (email) {
    try {
        const updatedUser = await this.findOneAndUpdate(
            { email },
            { emailVerifiedAt: new Date() },
            { new: true } // Trả về user sau khi cập nhật
        );

        if (!updatedUser) {
            throw new Error("Email not found!");
        }
        return updatedUser;
    } catch (err) {
        throw err;
    }
};

module.exports = mongoose.model("User", userSchema)