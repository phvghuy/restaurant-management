const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    // Bạn có thể thêm các trường khác nếu cần
    // ví dụ: tên, số điện thoại, v.v.
}, { timestamps: true });

const User = mongoose.model('User ', userSchema);

module.exports = User;