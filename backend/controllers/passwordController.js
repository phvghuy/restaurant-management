const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailer = require('../utils/mailer');
require('dotenv/config');

const passwordController = {
    sendVerificationEmail: async (req, res) => {
        const { email } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json("User  not found!");
            }

            const token = jwt.sign(
                { email: user.email },
                process.env.JWT_ACCESS_KEY,
                { expiresIn: '1h' }
            );

            const verifyLink = `${process.env.APP_URL}/v1/auth/verify?email=${user.email}&token=${token}`;

            await mailer.sendMail({
                to: user.email,
                subject: "[RESTAURANT MANAGEMENT] Verify Your Email",
                htmlContent: `<p>Click the link below to verify your email:</p>
                    <a href="${verifyLink}">Verify Email</a>`,
            });

            res.status(200).json({ message: "Verification email sent. Please check your inbox." });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    verifyAndChangePassword: async (req, res) => {
        const { email, token, newPassword } = req.body;

        try {
            const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);

            if (decoded.email !== email) {
                return res.status(400).json("Invalid verification token!");
            }

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json("User  not found!");
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);

            user.password = hashedPassword;
            await user.save();

            res.status(200).json({ message: "Password changed successfully!" });
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(400).json("Verification token has expired!");
            }
            res.status(500).json({ error: err.message });
        }
    },
};

module.exports = passwordController;