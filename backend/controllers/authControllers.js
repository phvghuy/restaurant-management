const User = require("../models/User")
const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")

//REDIS la database de luu tru refreshToken, 
//nhung chua co database nen tao array tuong trung
let refreshTokens = []

const authControllers = {
//GENERATE ACCESS TOKEN
    generateAccessToken: (user)=>{
        return jwt.sign ({
            id: user.id,
            admin: user.admin
        },
        //Tao secret key cho JWT
        process.env.JWT_ACCESS_KEY,
        // tao thoi han cho JWT 
        {expiresIn: "30s"}
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
                res.status(404).json("Wrong username!")
            }
            const validPassword = await bcrypt.compare(
                //password nhập vào
                req.body.password,
                //password hashed trên DB
                user.password
            )
            if (!validPassword) {
                res.status(404).json("Wrong password")
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
            })

            //Save to DB
            const user = await newUser.save()
            res.status(200).json(user)
        } catch (err) {
            res.status(500).json(err)
        }


    }
}

module.exports = authControllers