const { adminModel } = require("../../models/adminModel")
const jwt = require('jsonwebtoken')
const adminUserLogin = async (req, res) => {
    const { admin_userEmail, admin_userPassword } = req.body


    try {
        const data = await adminModel.findOne({ admin_userEmail, admin_userPassword })
        if (data) {
            const token = jwt.sign({ admin_userEmail }, process.env.TOKENKEY, { expiresIn: '7d' })
            res.send({
                status: 1,
                msg: 'Successfully Logged In',
                token
            })
        }
        else {
            res.send({
                status: 0,
                msg: 'Invalid Email or Password',
            })
        }
    }
    catch (error) {
        res.send({
            status: 0,
            msg: 'Something went wrong, please try again later',
            error
        })
    }
}


module.exports = { adminUserLogin }