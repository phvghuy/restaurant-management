const jwt = require("jsonwebtoken")

const middlewareController = {
    //verifyToken
    verifyToken: (req, res, next) => {
        const token = req.headers.token
        if(token) {
            //Vi trong headers cua token thi value se la Bearer ...
            //nen tach ra chi lay phan ... sau Bearer thoi
            const accessToken = token.split(" ")[1]
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                //neu loi nghia la khong phai nguoi dung dang nhap hoac Token het han
                if(err) {
                    // Thêm return để dừng lại
                    return res.status(403).json("Token is not valid")
                }
                req.user = user
                next()
            })
        }
        else {
            return res.status(401).json("You're not authenticated")
        }
    }
}

module.exports = middlewareController