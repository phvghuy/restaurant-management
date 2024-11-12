const User = require("../models/User")
const bcrypt = require("bcrypt")

const authControllers = {
    //Login
    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username })
            if (!user) {
                res.status(404).json{"Wrong username!"}
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
        } catch (err) {
            res.status(500).json(err)
        }
    }
}

module.exports = authControllers