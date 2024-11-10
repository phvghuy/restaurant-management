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
    admin: {
        type: Boolean,
        //mặc định ko phải là admin
        default: false,
    },
    //thêm thời gian khi tạo và cập nhật
}, { timestamps: true }
);

module.exports = mongoose.model("User", userSchema)