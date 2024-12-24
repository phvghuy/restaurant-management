//backend/controllers/middlewareControllers.js
const jwt = require("jsonwebtoken")

const middlewareController = {
    //verifyToken
    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        if(token) {
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if(err) {
                    return res.status(403).json("Token is not valid");
                }
                req.user = user;
                next(); // Gọi next() ở đây để tiếp tục đến middleware hoặc route handler tiếp theo
            });
        }
        else {
            return res.status(401).json("You're not authenticated");
        }
    },

    verifyTokenAndAdminAuth: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            // Sau khi verifyToken gọi next(), code ở đây sẽ được thực thi
            if (req.user.admin) {
                next(); // Bây giờ next() này là next() của verifyTokenAndAdminAuth
            } else {
                res.status(403).json("You're not Admin");
            }
        });
    },
}

module.exports = middlewareController;