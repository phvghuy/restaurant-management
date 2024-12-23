const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require('dotenv/config')
const mailer = require('../utils/mailer')

//REDIS la database de luu tru refreshToken, 
//nhung chua co database nen tao array tuong trung
let refreshTokens = []

const authControllers = {
    //REGISTER
    registerUser: async(req, res) => {
        try{
            //bcrypt hash password: mã hóa lại mk
            const salt = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hash(req.body.password, salt)
            
            //Create new user
            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed,
                fullName: req.body.fullName,
                phoneNumber: req.body.phoneNumber,
            })

            //Save to DB
            const user = await newUser.save()

            //cho chuc nang FORGOTPASSWORD va xac thuc email truoc khi REGISTER:
            // Generate verification token using JWT
            const token = jwt.sign(
                { email: user.email }, // Payload
                process.env.JWT_ACCESS_KEY, // Secret key
                { expiresIn: '1h' } // Token expiration time
            );

            // Create verification link
            const frontendURL = process.env.FRONTEND_URL || "http://localhost:3000"; 
            const verifyLink = `${frontendURL}/verify?email=${user.email}&token=${token}`;

            // Send email
            await mailer.sendMail({
                to: user.email,
                subject: "[RESTAURANT MANAGEMENT] Verify Your Email",
                htmlContent: `<p>Click the link below to verify your email:</p>
                    <a href="${verifyLink}">Verify Email</a>`,
            });

            res.status(200).json({ message: "User registered successfully. Please verify your email.", user });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    
//GENERATE ACCESS TOKEN
    generateAccessToken: (user)=>{
        return jwt.sign ({
            id: user.id,
            admin: user.admin
        },
        //Tao secret key cho JWT
        process.env.JWT_ACCESS_KEY,
        // tao thoi han cho JWT 
        {expiresIn: "1h"}
        )
    },

    //GENERATE REFRESH TOKEN
    generateRefreshToken: (user) => {
        return jwt.sign({
            id: user.id,
            admin: user.admin
        },
        //Tao refresh key cho JWT de luu tru
        process.env.JWT_REFRESH_KEY,
        // tao thoi han cho JWT 
        {expiresIn: "365d"}
        )
    },

    //Login
    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username })
            if (!user) {
                //them return, vi loi 'ER_HTTP_HEADERS_SENT' khi nhap sai tk nhung dung mk
                return res.status(404).json("Wrong username!")
            }
            const validPassword = await bcrypt.compare(
                //password nhập vào
                req.body.password,
                //password hashed trên DB
                user.password
            )
            if (!validPassword) {
                //them return, vi loi 'ER_HTTP_HEADERS_SENT' khi nhap sai tk nhung dung mk
                return res.status(404).json("Wrong password")
            }
            if (user && validPassword) {
                const accessToken = authControllers.generateAccessToken(user)
                const refreshToken = authControllers.generateRefreshToken(user)

                //tam thoi dung array de thay the database
                refreshTokens.push(refreshToken)
                // REDUX STORE -> ACCESSTOKEN
                // HTTPONLY COOKIE -> REFRESHTOKEN

                //luu reFreshToken vao Cookie
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    //khi DELOY thi set secure thanh true, con luc dev thi false
                    secure: false,
                    path: "/",
                    //ngan chan tan cong CSRF bang cach chi cho HTTP den tu site nay
                    sameSite: "strict",
                })

                //khong muon hien thi password khi tra ve thong tin
                const {password, ...others} = user._doc
                res.status(200).json({...others, accessToken})
            }
        } catch (err) {
            res.status(500).json(err)
        }
    },

    //REDIS la database de luu tru refreshToken, nhung chua co database nen tao array tuong trung
    requestRefreshToken: async(req, res) => {
        //lay refreshToken tu user
        //khi accessToken het han thi lay refreshToken de refresh lai Token moi
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) {
            return res.status(401).json("You're not authenticated")
        }
        //check xem refreshToken dang so huu co phai cua minh khong (dung refreshToken khong)
        if (!refreshTokens.includes(refreshToken)) {
            return res.status(403).json("Refresh token is not valid")
        }
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user)=>{
            if (err) {
                console.log(err)
            }
            //co token moi thi loc (bo) token cu di
            refreshTokens = refreshTokens.filter((token) => token !== refreshToken)
            //Tao new accessToken, refreshToken
            const newAccessToken = authControllers.generateAccessToken(user)
            const newRefreshToken = authControllers.generateRefreshToken(user)
            //loc cai cu ra roi gio push cai moi vo
            refreshTokens.push(newRefreshToken)
            //luu reFreshToken vao Cookie
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                //khi DELOY thi set secure thanh true, con luc dev thi false
                secure: false,
                path: "/",
                //ngan chan tan cong CSRF bang cach chi cho HTTP den tu site nay
                sameSite: "strict",
            })
            //tra lai cho user AccessToken vua moi tao lai
            res.status(200).json({accessToken: newAccessToken})
        })
    },

    //LOG OUT: bang cach clear het Token
    userLogout: async(req, res) => {
        res.clearCookie("refreshToken")
        //reset array (vd la Database) filter xoa token hien tai khoi array
        refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken)
        res.status(200).json("Logged out")
    },

    // VERIFY (cho forgotPassword)
    verify: async (req, res) => {
        try {
            const { email, token } = req.query;

            // Kiểm tra token hợp lệ và giải mã
            const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);

            // So sánh email từ token với email từ query
            if (decoded.email !== email) {
                return res.status(400).json("Invalid verification token!");
            }

            // Cập nhật emailVerifiedAt
            const updatedUser = await User.findOneAndUpdate(
                { email },
                { emailVerifiedAt: new Date() },
                { new: true } // Trả về user sau khi cập nhật
            );

            if (!updatedUser) {
                return res.status(404).json("User not found!");
            }

            // Chuyển hướng đến trang chủ của FE
            // Thay đổi URL dưới đây thành URL trang chủ của bạn
            const frontendURL = process.env.FRONTEND_URL || "http://localhost:3000"; 
            return res.redirect(`${frontendURL}`);
            
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(400).json("Verification token has expired!");
            }
            res.status(500).json({ error: err.message });
        }
    },

    // Forgot Password
    //forgotPassword: Phương thức này nhận địa chỉ email, tạo token, 
    //và gửi email chứa link để người dùng có thể thay đổi mật khẩu.
    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body;

            // Tìm người dùng trong cơ sở dữ liệu theo email
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json("User not found!");
            }

            // Tạo token để reset mật khẩu
            const token = jwt.sign(
                { email: user.email },
                process.env.JWT_ACCESS_KEY,
                { expiresIn: '1h' } // Token hết hạn trong 1 giờ
            );

            // Tạo link reset mật khẩu
            const frontendURL = process.env.FRONTEND_URL || "http://localhost:3000"; 
            const resetLink = `${frontendURL}/reset-password?email=${user.email}&token=${token}`;

            // Gửi email chứa link reset mật khẩu
            await mailer.sendMail({
                to: user.email,
                subject: "[RESTAURANT MANAGEMENT] Reset Your Password",
                htmlContent: `<p>Click the link below to reset your password:</p>
                    <a href="${resetLink}">Reset Password</a>`,
            });

            res.status(200).json({ message: "Check your email to reset your password." });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Reset Password
    //resetPassword: Phương thức này nhận token và mật khẩu mới từ người dùng, kiểm tra token hợp lệ, 
    //và cập nhật mật khẩu mới trong cơ sở dữ liệu. 
    resetPassword: async (req, res) => {
        try {
            const { email, token, password } = req.body;

            // Kiểm tra token hợp lệ và giải mã
            const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);

            // So sánh email từ token với email từ query
            if (decoded.email !== email) {
                return res.status(400).json("Invalid reset password token!");
            }

            // Mã hóa mật khẩu mới
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Cập nhật mật khẩu trong cơ sở dữ liệu
            const updatedUser = await User.findOneAndUpdate(
                { email },
                { password: hashedPassword },
                { new: true }
            );

            if (!updatedUser) {
                return res.status(404).json("User not found!");
            }

            res.status(200).json({ message: "Password reset successfully!" });
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(400).json("Reset password token has expired!");
            }
            res.status(500).json({ error: err.message });
        }
    },
};

module.exports = authControllers